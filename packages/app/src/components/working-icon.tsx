import { UpdateIcon } from "@radix-ui/react-icons"
import { useElectric } from "../context"
import { useLiveQuery } from "electric-sql/react"

export default function WorkingIcon() {
  const electric = useElectric()!
  if (electric) {
    const { db } = electric
    const { results: count } = useLiveQuery(
      db.ingredients_photo_uploads.liveFirst({
        where: {
          state: {
            notIn: [`reviewing`, `done`],
          },
        },
      })
    )

    if (count) {
      return <UpdateIcon className="icon-spin" />
    } else {
      return null
    }
  }
}
