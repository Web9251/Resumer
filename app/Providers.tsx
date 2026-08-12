"use client"

import { ReactNode } from "react"
import { ThemeProvider } from "./theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"

function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <ThemeProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </ThemeProvider>
    </>
  )
}
export default Providers
