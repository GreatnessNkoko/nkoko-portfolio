import { migrate } from "drizzle-orm/node-postgres/migrator";
import type pg from "pg";
import { createDb } from "./index";

/** Applies any pending SQL migrations from the given folder. */
export async function runMigrations(pool: pg.Pool, migrationsFolder: string): Promise<void> {
  await migrate(createDb(pool), { migrationsFolder });
}
