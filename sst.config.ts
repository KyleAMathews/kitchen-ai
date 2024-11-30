/// <reference path="./.sst/platform/config.d.ts" />

import { execSync } from "child_process"

export default $config({
  app(input) {
    return {
      name: `kitchen-ai`,
      removal: input?.stage === `production` ? `retain` : `remove`,
      home: `aws`,
      providers: {
        neon: `0.6.3`,
        aws: {
          profile: `kyle`,
        },
      },
    }
  },
  async run() {
    try {
      const { electricInfo, databaseUri } = createExampleDbAndAddtoElectric({
        name: $app.name,
      })

      databaseUri.properties.url.apply(applyMigrations)

      const electricUrlLink = new sst.Linkable(`ElectricUrl`, {
        properties: {
          url: process.env.ELECTRIC_URL,
        },
      })

      // Add Cloudflare Worker
      const worker = new sst.cloudflare.Worker(`${$app.name}-worker`, {
        handler: `./packages/functions/src/index.ts`,
        url: true,
        link: [databaseUri, electricInfo, electricUrlLink],
      })

      const website = deploySite(electricInfo, worker)

      return {
        databaseUri: databaseUri.properties.url,
        ...electricInfo.properties,
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
      VITE_ELECTRIC_URL: process.env.ELECTRIC_URL!,
      VITE_API_URL: worker.url as unknown as string,
      VITE_CLERK_PUBLISHABLE_KEY: process.env.VITE_CLERK_PUBLISHABLE_KEY!,
    },
  })
}

function createExampleDbAndAddtoElectric({ name }: { name: string }) {
  const NEON_ELECTRIC_EXAMPLES_ID = `calm-breeze-71276912`
  const project = neon.getProjectOutput({ id: NEON_ELECTRIC_EXAMPLES_ID })

  const db = new neon.Database(`${name}-${$app.stage}-db`, {
    projectId: project.id,
    branchId: project.defaultBranchId,
    name:
      $app.stage === `Production`
        ? `${name}-production`
        : `${name}-${$app.stage}`,
    ownerName: `neondb_owner`,
  })
  const databaseUri = getNeonDbUri(project, db)

  const electricInfo = databaseUri.apply((uri) => addDatabaseToElectric(uri))
  electricInfo.apply(console.log)

  const electricInfoLink = new sst.Linkable(`electricInfo`, {
    properties: {
      database_id: electricInfo.id,
      token: electricInfo.token,
    },
  })

  const databaseUriLink = new sst.Linkable(`databaseUriLink`, {
    properties: {
      url: databaseUri,
    },
  })

  return { electricInfo: electricInfoLink, databaseUri: databaseUriLink }
}

function getNeonDbUri(
  project: $util.Output<neon.GetProjectResult>,
  db: neon.Database
) {
  const passwordOutput = neon.getBranchRolePasswordOutput({
    projectId: project.id,
    branchId: project.defaultBranchId,
    roleName: db.ownerName,
  })

  return $interpolate`postgresql://${passwordOutput.roleName}:${passwordOutput.password}@${project.databaseHost}/${db.name}?sslmode=require`
}

async function addDatabaseToElectric(
  uri: string
): Promise<{ id: string; token: string }> {
  const adminApi = `https://admin-api-dev-production.electric-sql.com`

  const result = await fetch(`${adminApi}/v1/databases`, {
    method: `PUT`,
    headers: { "Content-Type": `application/json` },
    body: JSON.stringify({
      database_url: uri,
      region: `us-east-1`,
    }),
  })

  if (!result.ok) {
    throw new Error(
      `Could not add database to Electric (${result.status}): ${await result.text()}`
    )
  }

  return (await result.json()) as { id: string; token: string }
}
