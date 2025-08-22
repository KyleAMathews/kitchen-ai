// apps/web/src/polyfills/debug.js
const noop = () => {}

const createDebug = (namespace) => {
  const debugFn = () => {}
  debugFn.enable = noop
  debugFn.disable = noop
  debugFn.enabled = false
  debugFn.names = []
  debugFn.skips = []
  debugFn.formatters = {}
  debugFn.namespace = namespace
  return debugFn
}

const debug = createDebug
debug.debug = createDebug
debug.enable = noop
debug.disable = noop
debug.enabled = noop
debug.names = []
debug.skips = []
debug.formatters = {}
debug.humanize = (ms) => ms

export default debug
export { debug }
