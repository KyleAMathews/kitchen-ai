import { useState, useEffect } from "react"
import { makeElectricContext } from "electric-sql/react"
import { Electric, schema } from "../src/generated/client"
import { useAuth, useUser } from "@clerk/clerk-react"
import { initElectric, setLoggedOut } from "electric-query"
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

  useEffect(() => {
    // declare the data fetching function
    const setupElectric = async () => {
      const token = await getToken()
      if (token) {
        const config = {
          appName: `kitchen-ai`,
          schema,
          sqliteWasmPath: sqliteWasm,
          config: {
            debug: false, //DEBUG_MODE,
            url: electricUrl,
            auth: {
              token,
            },
          },
        }
        console.log({ config })
        const electric = await initElectric(config)
        setDb(electric)
        console.log({ electric })

        // Connect to Electric
        await electric.connect(token)
        console.log(`connected`, { token })
        // Renew the JWT every hour
        const oneMinute = 60 * 1000
        let stopRenewing = renewPeriodically(electric, oneMinute)

        // Subscribe to connectivity changes to detect JWT expiration
        electric.notifier.subscribeToConnectivityStateChanges(async (x) => {
          if (
            x.connectivityState.status === `disconnected` &&
            x.connectivityState.error === `JWT expired`
          ) {
            console.log(`JWT expired, reconnecting...`)
            stopRenewing() // NOTE: the connectivity state change event is async and is fired after the socket to Electric is closed. Between the socket closing and this event firing, we may have tried to renew the token which will fail
            const newToken = getToken()
            await electric.connect(newToken)
            console.log(`connection restored`)
            stopRenewing = renewPeriodically(electric, oneMinute)
          }
        })

        // Renews the JWT periodically
        // and returns a function that can be called to stop renewing
        function renewPeriodically(electric: Electric, ms: number) {
          const id = setInterval(async () => {
            // Renew the JWT
            const renewedToken = getToken()
            await electric.renew(renewedToken)
            console.log(`Renewed JWT`)
          }, ms)
          return () => {
            clearInterval(id)
          }
        }

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
