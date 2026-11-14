import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

export * from "./schema";
export { desc, eq } from "drizzle-orm";

export type Database = NodePgDatabase<typeof schema>;

/**
 * Hosted Postgres (Neon, Render, Supabase...) requires TLS. Local databases
 * usually don't support it, so TLS is only switched on for remote hosts
 * unless the connection string says otherwise (sslmode=...).
 */
function sslFor(connectionString: string): pg.PoolConfig["ssl"] {
  const url = new URL(connectionString);
  if (url.searchParams.has("sslmode")) return undefined;
  const local = ["localhost", "127.0.0.1", "::1"].includes(url.hostname);
  return local ? false : { rejectUnauthorized: true };
}

export function createPool(connectionString: string): pg.Pool {
  return new pg.Pool({
    connectionString,
    ssl: sslFor(connectionString),
    max: 5,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
  });
}

export function createDb(pool: pg.Pool): Database {
  return drizzle(pool, { schema });
}
