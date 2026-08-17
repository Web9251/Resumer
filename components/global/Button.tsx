import { Button as ButtonUi } from "@/components/ui/button"
import { cn } from "@/lib/utils"

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
}

export const Button = ({
  className,
  size,
  variant,
  asChild,
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
