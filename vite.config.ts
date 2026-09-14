// prettier-ignore
// @ts-expect-error The local prototype Vite plugin is authored in JavaScript.
import { endpointsProbe, serverBoundary } from "/Users/kylemathews/.codex/worktrees/e079/tanstack-db/probes/endpoints/integrated-todo/transform.mjs"
import { defineConfig } from "vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import { nitro } from "nitro/vite"
import react from "@vitejs/plugin-react"
import { fromFile } from "@capsizecss/unpack"
import path from "path"
import { capsizeRadixPlugin } from "vite-plugin-capsize-radix"
import montserrat from "@capsizecss/metrics/montserrat"
import arial from "@capsizecss/metrics/arial"

export default defineConfig(async () => {
  // Load GeneralSans font metrics (if still available)
  let generalSansMetrics
  try {
    generalSansMetrics = await fromFile(
      `./public/GeneralSans_Complete/Fonts/WEB/fonts/GeneralSans-Regular.ttf`
    )
    generalSansMetrics.familyName = `GeneralSans`
  } catch (_error) {
    console.warn(`GeneralSans font not found, falling back to system fonts`)
    generalSansMetrics = arial // fallback
  }

  return {
    server: {
      host: `127.0.0.1`,
      port: 4196,
      fs: {
        allow: [
          new URL(`.`, import.meta.url).pathname,
          `/Users/kylemathews/.codex/worktrees/e079/tanstack-db`,
          `/Users/kylemathews/programs/kitchen-ai`,
        ],
      },
    },
    plugins: [
      serverBoundary(),
      endpointsProbe(),
      // Nitro for Node.js deployment
      nitro(),

      // Typography optimization
      capsizeRadixPlugin({
        outputPath: `./src/typography.css`,
        defaultFontStack: [generalSansMetrics, arial],
        headingFontStack: [montserrat, arial],
      }),
      // TanStack Start
      tanstackStart(),
      // React plugin
      react(),
    ],
    resolve: {
      tsconfigPaths: false,
      dedupe: [
        `zod`,
        `react`,
        `react-dom`,
        `@tanstack/query-core`,
        `@tanstack/pacer-lite`,
        `fractional-indexing`,
        `sorted-btree`,
        `use-sync-external-store`,
      ],
      alias: {
        "@": new URL(`./src`, import.meta.url).pathname,
        "@tanstack/query-db-collection": `/Users/kylemathews/.codex/worktrees/e079/tanstack-db/packages/query-db-collection/src/index.ts`,
        "@tanstack/react-db": `/Users/kylemathews/.codex/worktrees/e079/tanstack-db/packages/react-db/src/index.ts`,
        "@tanstack/db-ivm": `/Users/kylemathews/.codex/worktrees/e079/tanstack-db/packages/db-ivm/src/index.ts`,
        "@tanstack/db": `/Users/kylemathews/.codex/worktrees/e079/tanstack-db/packages/db/src/index.ts`,
        debug: path.resolve(import.meta.dirname, `./src/polyfills/debug.js`),
      },
    },
    ssr: {
      noExternal: [
        `debug`,
        `@tanstack/db`,
        `@tanstack/db-ivm`,
        `@tanstack/react-db`,
        `@tanstack/query-db-collection`,
      ],
    },
    build: {
      rollupOptions: {
        external: [
          `pg-native`,
          `pg`,
          `cloudflare:sockets`,
          /^@opentelemetry\//,
        ],
      },
    },
  }
})
