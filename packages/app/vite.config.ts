import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import { fromFile } from "@capsizecss/unpack"
import { capsizeRadixPlugin } from "vite-plugin-capsize-radix"
import montserrat from "@capsizecss/metrics/montserrat"
import arial from "@capsizecss/metrics/arial"

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const generalSansMetrics = await fromFile(
    `./static/GeneralSans_Complete/Fonts/WEB/fonts/GeneralSans-Regular.ttf`
  )
  generalSansMetrics.familyName = `GeneralSans`
  console.log({ generalSansMetrics })
  return {
    plugins: [
      react(),
      capsizeRadixPlugin({
        outputPath: `./src/typography.css`,
        defaultFontStack: [generalSansMetrics, arial],
        headingFontStack: [montserrat, arial],
      }),
    ],
    define: {
      VITE_ELECTRIC_URL: JSON.stringify(process.env.VITE_ELECTRIC_URL),
    },
    assetsInclude: [`**/*.wasm`],
  }
})
