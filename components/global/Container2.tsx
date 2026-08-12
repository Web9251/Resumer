// components/ui/container.tsx
import { cn } from "@/lib/utils"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "page" | "prose" | "full"
}

export function Container2({
  className,
  size = "page",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-(--spacing-gutter)",
        size === "page" && "max-w-7xl",
        size === "prose" && "max-w-[65ch]",
        size === "full" && "max-w-none",
        className,
      )}
      {...props}
    />
  )
}
