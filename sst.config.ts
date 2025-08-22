/// <reference path="./.sst/platform/config.d.ts" />

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
      // TODO put pg & electric info here via secrets.
      const connectionInfo = {
        ELECTRIC_SECRET: new sst.Secret(`ELECTRIC_SECRET`),
        ELECTRIC_ID: new sst.Secret(`ELECTRIC_ID`),
        PGURI: new sst.Secret(`PGURI`),
        PGURI_POOL: new sst.Secret(`PGURI_POOL`),
        OPENAI_KEY: new sst.Secret(`OPENAI_KEY`),
      }

      connectionInfo.PGURI_POOL.value.apply(
        async (dburi) => await applyMigrations(dburi)
      )

      // Add Cloudflare Worker
      const worker = new sst.cloudflare.Worker(`${$app.name}-worker`, {
        handler: `./packages/functions/src/index.ts`,
        url: true,
        environment: {
          ...Object.fromEntries(
            Object.entries(connectionInfo).map(([key, secret]) => [
              key,
              secret.value,
            ])
          ),
        },
      })

      const website = deploySite(connectionInfo, worker)

      return {
        ...connectionInfo,
        website: website.url,
        api: worker.url,
      }
    } catch (e) {
      console.error(`Failed to deploy ${$app.name} stack`, e)
    }
  },
})

// pg_dump --data-only --no-owner --no-privileges "postgresql://mathews.kyle:AosB6Fqa2wJC@ep-frosty-breeze-a6mpxhgo-pooler.us-west-2.aws.neon.tech/neondb?sslmode=require" | psql "postgresql://postgres:mXAhACvGxPlKbHKJ@db.rvksdcveprumaohdikrj.supabase.co:5432/postgres

async function applyMigrations(uri) {
  console.log(`apply migrations to `, uri)
  const { execSync } = await import(`child_process`)
  execSync(`npx pg-migrations apply --directory ./migrations`, {
    env: {
      ...process.env,
      DATABASE_URL: uri,
    },
  })
}

function deploySite(connectionInfo, worker: sst.cloudflare.Worker) {
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
      VITE_ELECTRIC_SECRET: connectionInfo.ELECTRIC_SECRET,
      VITE_ELECTRIC_ID: connectionInfo.ELECTRIC_ID,
      VITE_API_URL: worker.url as unknown as string,
    },
  })
}
