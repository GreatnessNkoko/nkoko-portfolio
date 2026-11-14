import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createDb, createPool } from "@portfolio/database";
import { runMigrations } from "@portfolio/database/migrate";
import { createApp } from "./app";
import { loadConfig } from "./config";
import { log } from "./log";

const here = path.dirname(fileURLToPath(import.meta.url));

/** dist/migrations in a build, database/migrations when run from source. */
function migrationsFolder(): string {
  const candidates = [path.join(here, "migrations"), path.resolve(here, "../../database/migrations")];
  const found = candidates.find((p) => existsSync(path.join(p, "meta", "_journal.json")));
  if (!found) throw new Error("Could not find the database migrations folder.");
  return found;
}

async function main() {
  const config = loadConfig();
  const pool = createPool(config.DATABASE_URL);

  if (config.MIGRATE_ON_START) {
    await runMigrations(pool, migrationsFolder());
    log.info("database migrations applied");
  }
  if (!config.RESEND_API_KEY) {
    log.warn("RESEND_API_KEY is not set: contact messages will be saved but not emailed");
  }

  const app = createApp(config, createDb(pool));
  const server = app.listen(config.PORT, () => {
    log.info(`API listening on port ${config.PORT}`);
  });

  const shutdown = () => {
    log.info("shutting down");
    server.close(() => void pool.end().finally(() => process.exit(0)));
    setTimeout(() => process.exit(0), 10_000).unref();
  };
  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}

main().catch((err) => {
  log.error("failed to start", err);
  process.exit(1);
});
