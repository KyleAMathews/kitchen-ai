export default {
  rollupConfig: {
    external: [`pg-native`, `cloudflare:sockets`, `pg`, /^@opentelemetry\//],
  },
  externals: {
    trace: false,
  },
  alias: {
    debug: `./src/polyfills/debug.js`,
  },
}
