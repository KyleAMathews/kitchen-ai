import { useState, useEffect } from "react"
import { makeElectricContext } from "electric-sql/react"
import { Electric, schema } from "../src/generated/client"
import { useAuth, useUser } from "@clerk/clerk-react"
import sqliteWasm from "wa-sqlite/dist/wa-sqlite-async.wasm?asset"
import { isEqual } from "lodash"

export const { ElectricProvider, useElectric } = makeElectricContext<Electric>()

const electricUrl =
  typeof import.meta.env.VITE_ELECTRIC_URL === `undefined`
    ? `ws://localhost:5133`
    : `wss://${import.meta.env.VITE_ELECTRIC_URL}`
// const electricUrl = `https://easy-coats-pick.loca.lt`

export function ElectricalProvider({ children }) {
  const { getToken, isSignedIn } = useAuth()
  const { user } = useUser()
  const [db, setDb] = useState<Electric>()

  // Renew the JWT every minute
  const oneMinute = 60 * 1000
  useEffect(() => {
    // declare the data fetching function
    const setupElectric = async () => {
      const token = await getToken()
      if (token) {
        const config = {
          appName: `kitchen-ai`,
          schema,
          sqliteWasmPath: sqliteWasm,
          token,
          config: {
            debug: false, //DEBUG_MODE,
            url: electricUrl,
          },
          getToken,
          renewInterval: oneMinute,
        }
        console.log({ config })
        const electric = await initElectric(config)
        setDb(electric)
        console.log({ electric })

        // Sync user data in if it's changed.
        const { db } = electric
        console.log(db)
        const syncPromise = await db.users.sync()
        await syncPromise.synced
        const { fullName, imageUrl, id } = user
        const clerkUser = { name: fullName, id, avatar_url: imageUrl }
        const dbUser =
          (await db.users.findUnique({
            where: {
              id,
            },
          })) || {}
        console.log({ dbUser, clerkUser })
        if (!isEqual(dbUser, clerkUser)) {
          db.users.upsert({
            create: {
              ...clerkUser,
            },
            update: {
              ...clerkUser,
            },
            where: {
              id,
            },
          })
        }
      }
    }

    if (isSignedIn === false) {
      setLoggedOut()
    }
    if (isSignedIn) {
      // call the function
      setupElectric()
        // make sure to catch any error
        .catch(console.error)
    }
  }, [getToken, isSignedIn])

  return <ElectricProvider db={db}>{children}</ElectricProvider>
}
