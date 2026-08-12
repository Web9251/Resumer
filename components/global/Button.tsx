import { Button as ButtonUi } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { buttonTheme } from "@/utils/styles"
import { ReactNode } from "react"

interface Props extends React.ComponentProps<"button"> {
  className?: string
  size?:
    | "default"
    | "xs"
    | "sm"
    | "lg"
    | "icon"
    | "icon-xs"
    | "icon-sm"
    | "icon-lg"
    | null
    | undefined
  variant?:
    | "default"
    | "link"
    | "outline"
    | "secondary"
    | "ghost"
    | "destructive"
    | null
    | undefined
  asChild?: boolean
  // children: ReactNode
}

export const Button = ({
  className,
  size,
  variant,
  asChild,
  // children,
  ...props
}: Props) => {
  return (
    <ButtonUi
      size={size}
      variant={variant}
      className={cn(className)}
      asChild={asChild}
      {...props}
    />
  )
}
