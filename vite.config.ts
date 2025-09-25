import { defineConfig } from "vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import react from "@vitejs/plugin-react"
import viteTsConfigPaths from "vite-tsconfig-paths"
import { fromFile } from "@capsizecss/unpack"
import path from "path"
import { capsizeRadixPlugin } from "vite-plugin-capsize-radix"
import montserrat from "@capsizecss/metrics/montserrat"
import arial from "@capsizecss/metrics/arial"
import { caddyPlugin } from "./src/vite-plugin-caddy"

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
      host: true,
    },
    plugins: [
      // Path aliases support
      viteTsConfigPaths({
        projects: [`./tsconfig.json`],
      }),
      // TanStack Start
      tanstackStart({
        srcDirectory: `src`,
        start: { entry: `./start.tsx` },
        server: { entry: `./server.ts` },
        customViteReactPlugin: true,
        prerender: {
          enabled: false, // Completely disable all prerendering
        },
        spa: {
          enabled: true,
          prerender: {
            enabled: false, // Disable SPA prerendering
            crawlLinks: false, // Disable link crawling
          },
        },
      }),
      // React plugin
      react(),
      // Local HTTPS with Caddy
      caddyPlugin(),
      // Typography optimization
      capsizeRadixPlugin({
        outputPath: `./src/typography.css`,
        defaultFontStack: [generalSansMetrics, arial],
        headingFontStack: [montserrat, arial],
      }),
    ],
    resolve: {
      alias: {
        debug: path.resolve(__dirname, `./src/polyfills/debug.js`),
      },
    },
    ssr: {
      noExternal: [`debug`, `@tanstack/electric-db-collection`],
    },
    define: {
      VITE_ELECTRIC_URL: JSON.stringify(process.env.VITE_ELECTRIC_URL),
    },
    build: {
      rollupOptions: {
        external: [`pg-native`, `pg`, `cloudflare:sockets`],
      },
    },
  }
})
