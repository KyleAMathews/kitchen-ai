import { createStart } from "@tanstack/react-start"

export const startInstance = createStart(() => {
  return {
    defaultSsr: false, // SPA mode as configured in vite.config
  }
})
