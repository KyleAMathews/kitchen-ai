export default {
  rollupConfig: {
    external: [`pg-native`, `cloudflare:sockets`, `pg`],
  },
  externals: {
    trace: false,
  },
  alias: {
    debug: "./src/polyfills/debug.js",
  },
}
