import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Vendored skill reference bundles — not part of the app.
    "agent/**",
    ".agents/**",
    ".claude/**",
    // Standalone Sanity Studio workspace — has its own toolchain.
    "studio/**",
    // TypeGen output.
    "sanity.types.ts",
  ]),
]);

export default eslintConfig;
