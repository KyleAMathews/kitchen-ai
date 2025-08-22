export default {
  rollupConfig: {
    external: [`pg-native`, `cloudflare:sockets`],
  },
  externals: {
    traceInclude: [`pg`],
  },
}

