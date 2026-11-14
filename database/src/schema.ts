import { boolean, index, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

/** Every message sent through the website's contact form. */
export const contactMessages = pgTable(
  "contact_messages",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    subject: text("subject").notNull().default(""),
    message: text("message").notNull(),
    /** True once the notification email reached the email provider. */
    emailed: boolean("emailed").notNull().default(false),
    /** Why the notification email failed, if it did. */
    emailError: text("email_error"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("contact_messages_created_at_idx").on(table.createdAt)],
);

export type ContactMessageRow = typeof contactMessages.$inferSelect;
export type NewContactMessageRow = typeof contactMessages.$inferInsert;
