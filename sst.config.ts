/// <reference path="./.sst/platform/config.d.ts" />

import { execSync } from "child_process"

export default $config({
  app(input) {
    return {
      name: `kitchen-ai`,
      removal: input?.stage === `production` ? `retain` : `remove`,
      home: `aws`,
      providers: {
        // neon: `0.6.3`,
        aws: {
          profile: `kyle`,
        },
      },
    }
  },
  async run() {
    try {
      const electriDbInfo = new sst.Linkable(`ElectricUrl`, {
        properties: {
          url: process.env.ELECTRIC_URL,
          SOURCE_SECRET: process.env.SOURCE_SECRET,
          SOURCE_ID: process.env.SOURCE_ID,
          DATABASE_URL: process.env.DATABASE_URL,
        },
      })

      applyMigrations(electriDbInfo.properties.DATABASE_URL)

      // Add Cloudflare Worker
      const worker = new sst.cloudflare.Worker(`${$app.name}-worker`, {
        handler: `./packages/functions/src/index.ts`,
        url: true,
        link: [electriDbInfo],
      })

      const website = deploySite(electriDbInfo, worker)

      return {
        ...electriDbInfo.properties,
        website: website.url,
        api: worker.url,
      }
    } catch (e) {
      console.error(`Failed to deploy ${$app.name} stack`, e)
    }
  },
})

function applyMigrations(uri: string) {
  console.log(`apply migrations to `, uri)
  execSync(`npx pg-migrations apply --directory ./migrations`, {
    env: {
      ...process.env,
      DATABASE_URL: uri,
    },
  })
}

function deploySite(
  electricInfo: sst.Linkable<{
    database_id: $util.Output<string>
    token: $util.Output<string>
  }>,
  worker: sst.cloudflare.Worker
) {
  return new sst.aws.StaticSite(`${$app.name}-site`, {
    domain: {
      name: `kitchen-ai${$app.stage === `production` ? `` : `-stage-${$app.stage}`}.bricolage.io`,
      dns: sst.cloudflare.dns(),
    },
    path: `packages/app`,
    dev: {
      command: `npm run dev`,
      url: `http://localhost:5173`,
    },
    build: {
      command: `npm run build`,
      output: `dist`,
    },
    environment: {
      VITE_ELECTRIC_TOKEN: electricInfo.properties.token,
      VITE_DATABASE_ID: electricInfo.properties.database_id,
      VITE_API_URL: worker.url as unknown as string,
      VITE_CLERK_PUBLISHABLE_KEY: process.env.VITE_CLERK_PUBLISHABLE_KEY!,
    },
  })
}
