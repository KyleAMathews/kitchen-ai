import { Outlet } from "react-router-dom"
import { Flex } from "@radix-ui/themes"
export default function Root() {
  return (
    <Flex p="4">
      <Outlet />
    </Flex>
  )
}
