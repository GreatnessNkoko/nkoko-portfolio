// Bundles the API (and the workspace packages it uses) into dist/index.mjs,
// and copies the database migrations next to it so they ship with the build.
import { build } from "esbuild";
import { cp, readFile, rm } from "node:fs/promises";

await rm("dist", { recursive: true, force: true });

const pkg = JSON.parse(await readFile("package.json", "utf8"));
// npm packages stay in node_modules; only our own workspace code is bundled.
const external = Object.keys(pkg.dependencies).filter((d) => !d.startsWith("@portfolio/"));
external.push("pg-native");

await build({
  entryPoints: ["src/index.ts"],
  outfile: "dist/index.mjs",
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node22",
  sourcemap: true,
  external,
  logLevel: "info",
});

await cp("../database/migrations", "dist/migrations", { recursive: true });
console.log("Copied database migrations to dist/migrations");
