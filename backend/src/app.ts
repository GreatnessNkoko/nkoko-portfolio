import cors from "cors";
import express, { type ErrorRequestHandler } from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import { contactMessages, eq, type Database } from "@portfolio/database";
import { contactMessageSchema, type ContactResponse } from "@portfolio/shared";
import type { Config } from "./config";
import { sendContactNotification } from "./email";
import { log } from "./log";

export function createApp(config: Config, db: Database) {
  const app = express();

  app.set("trust proxy", config.TRUST_PROXY);
  app.disable("x-powered-by");
  app.use(helmet());
  app.use(
    cors({
      origin: config.CORS_ORIGIN.length ? config.CORS_ORIGIN : false,
      methods: ["GET", "POST"],
    }),
  );
  app.use(express.json({ limit: "20kb" }));

  // Used by Render's health check, and by the website to wake the API up.
  app.get("/api/healthz", (_req, res) => {
    res.json({ ok: true });
  });

  const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    handler: (_req, res) => {
      const body: ContactResponse = {
        ok: false,
        error: "You have sent several messages in a short time. Please try again in a few minutes.",
      };
      res.status(429).json(body);
    },
  });

  app.post("/api/contact", contactLimiter, async (req, res) => {
    const parsed = contactMessageSchema.safeParse(req.body ?? {});
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      // A filled-in honeypot means a bot: pretend it worked and drop it.
      if (issue?.path[0] === "website") {
        res.status(201).json({ ok: true } satisfies ContactResponse);
        return;
      }
      res.status(400).json({
        ok: false,
        error: issue?.message ?? "Invalid message.",
        field: issue?.path.join("."),
      } satisfies ContactResponse);
      return;
    }

    const { website: _honeypot, ...msg } = parsed.data;

    // Save first, so a message is never lost even if email delivery fails.
    const [row] = await db.insert(contactMessages).values(msg).returning({ id: contactMessages.id });

    const result = await sendContactNotification(config, parsed.data);
    if (result.sent) {
      await db.update(contactMessages).set({ emailed: true }).where(eq(contactMessages.id, row!.id));
      log.info(`contact message ${row!.id} saved and emailed`);
    } else {
      await db
        .update(contactMessages)
        .set({ emailError: result.reason })
        .where(eq(contactMessages.id, row!.id));
      log.warn(`contact message ${row!.id} saved, email not sent: ${result.reason}`);
    }

    res.status(201).json({ ok: true } satisfies ContactResponse);
  });

  app.use("/api", (_req, res) => {
    res.status(404).json({ ok: false, error: "Not found" });
  });

  const onError: ErrorRequestHandler = (err, _req, res, _next) => {
    // Malformed JSON bodies and oversized payloads come through here.
    const status = typeof err?.status === "number" && err.status < 500 ? err.status : 500;
    if (status >= 500) log.error("unhandled error", err);
    res.status(status).json({
      ok: false,
      error: status >= 500 ? "Something went wrong on our side. Please try again later." : "Invalid request.",
    } satisfies ContactResponse);
  };
  app.use(onError);

  return app;
}
