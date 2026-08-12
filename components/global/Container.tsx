import { cn } from "@/lib/utils"
import { ReactNode } from "react"

function Container({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16",
        className,
      )}
    >
      {children}
    </div>
  )
}
export default Container
