import { spawn, type ChildProcess } from "node:child_process"
import { readFileSync, writeFileSync } from "node:fs"
import { networkInterfaces } from "node:os"
import type { Plugin } from "vite"

interface CaddyPluginOptions {
  host?: string
  encoding?: boolean
  autoStart?: boolean
  configPath?: string
}

function getNetworkIp() {
  for (const interfaces of Object.values(networkInterfaces())) {
    for (const address of interfaces ?? []) {
      if (address.family === `IPv4` && !address.internal) {
        return address.address
      }
    }
  }
}

function getProjectName() {
  try {
    const packageJson = JSON.parse(
      readFileSync(`${process.cwd()}/package.json`, `utf8`)
    ) as { name?: string }
    return packageJson.name || `app`
  } catch {
    console.warn(`Could not read package.json; using "app" for the local host`)
    return `app`
  }
}

export function caddyPlugin(options: CaddyPluginOptions = {}): Plugin {
  const {
    host = `localhost`,
    encoding = true,
    autoStart = true,
    configPath = `Caddyfile`,
  } = options

  let caddyProcess: ChildProcess | null = null

  const generateCaddyfile = (
    projectName: string,
    vitePort: number,
    networkIp?: string
  ) => {
    const encodingConfig = encoding ? `\n\tencode gzip` : ``
    const localConfig = `${projectName}.localhost {
\treverse_proxy ${host}:${vitePort}${encodingConfig}
}`
    const networkConfig = networkIp
      ? `

# Network access
${networkIp} {
\treverse_proxy ${host}:${vitePort}${encodingConfig}
}`
      : ``

    return `${localConfig}${networkConfig}\n`
  }

  const stopCaddy = () => {
    if (caddyProcess && !caddyProcess.killed) {
      caddyProcess.kill(`SIGTERM`)
    }
    caddyProcess = null
  }

  const startCaddy = (projectName: string, vitePort: number) => {
    if (!autoStart || caddyProcess) return

    const networkIp = getNetworkIp()
    writeFileSync(
      configPath,
      generateCaddyfile(projectName, vitePort, networkIp)
    )

    caddyProcess = spawn(`caddy`, [`run`, `--config`, configPath], {
      stdio: `inherit`,
    })
    caddyProcess.once(`error`, (error) => {
      console.error(`Failed to start Caddy: ${error.message}`)
    })
    caddyProcess.once(`exit`, (code, signal) => {
      if (code && code !== 0) {
        console.error(`Caddy exited with code ${code}`)
      } else if (signal && signal !== `SIGTERM`) {
        console.error(`Caddy exited after ${signal}`)
      }
      caddyProcess = null
    })
  }

  return {
    name: `vite-plugin-caddy`,
    apply: `serve`,
    configureServer(server) {
      const projectName = getProjectName()
      const networkIp = getNetworkIp()

      server.printUrls = () => {
        console.log()
        console.log(`  ➜  Local:   https://${projectName}.localhost/`)
        if (networkIp) {
          console.log(`  ➜  Network: https://${networkIp}/`)
        }
        console.log(`  ➜  press h + enter to show help`)
        console.log()
      }

      // Vite may choose a fallback when the requested port is busy. Read the
      // bound socket after it starts listening so Caddy gets the real port.
      server.httpServer?.once(`listening`, () => {
        const address = server.httpServer?.address()
        if (!address || typeof address === `string`) {
          console.error(`Could not determine Vite's bound port`)
          return
        }
        startCaddy(projectName, address.port)
      })

      server.httpServer?.once(`close`, stopCaddy)
      process.once(`SIGINT`, stopCaddy)
      process.once(`SIGTERM`, stopCaddy)
      process.once(`exit`, stopCaddy)
    },
  }
}
