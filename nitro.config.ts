export default {
  rollupConfig: {
    external: [`pg-native`, `cloudflare:sockets`, `pg`],
  },
  externals: {
    trace: false,
  },
  experimental: {
    wasm: false,
  },
  alias: {
    debug: "./src/polyfills/debug.js",
  },
}

