import path from "node:path";
import { fileURLToPath } from "node:url";
import { createPool } from "./index";
import { runMigrations } from "./migrate";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}

const folder = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../migrations");
const pool = createPool(url);
try {
  await runMigrations(pool, folder);
  console.log("Database is up to date.");
} finally {
  await pool.end();
}
