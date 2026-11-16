import { execFileSync } from "node:child_process";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const buildDate = new Date(
  Number(process.env.SOURCE_DATE_EPOCH || Date.now() / 1000) * 1000,
).toISOString();
let revision = process.env.GITHUB_SHA || "unknown";
let dirty = false;
try {
  if (revision === "unknown")
    revision = execFileSync("git", ["rev-parse", "HEAD"], {
      encoding: "utf8",
    }).trim();
  execFileSync("git", ["diff", "--quiet", "HEAD"], { stdio: "ignore" });
} catch {
  dirty = true;
}
const buildInfo = { builtAt: buildDate, revision, dirty, version: "0.1.0" };
export default defineConfig({
  plugins: [
    react(),
    {
      name: "ethics-build-provenance",
      generateBundle() {
        this.emitFile({
          type: "asset",
          fileName: "build.json",
          source: JSON.stringify(buildInfo, null, 2) + "\n",
        });
      },
    },
  ],
  base: "/",
  define: {
    __BUILD_DATE__: JSON.stringify(buildDate),
    __BUILD_REVISION__: JSON.stringify(revision),
    __BUILD_DIRTY__: JSON.stringify(dirty),
  },
});
