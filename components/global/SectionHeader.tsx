import { FadeInVertical } from "@/components/motion/FadeIn"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { header, subtitle, textGradient, verticalSpaced } from "@/utils/styles"

type Props = {
  badgeText: string
  heading: string
  subHeading?: string
  gradientText?: string
}

function SectionHeader({
  badgeText,
  heading,
  subHeading,
  gradientText,
}: Props) {
  return (
    <div className={cn(verticalSpaced)}>
      {badgeText && (
        <FadeInVertical delay={0}>
          <Badge
            variant='outline'
            className='text-xs p-3 gap-4 sm:gap-5 capitalize'
          >
            {badgeText}
          </Badge>
        </FadeInVertical>
      )}
      <FadeInVertical delay={0.1}>
        <h1
          className={cn(
            header,
            "capitalize leading-9 sm:leading-12 lg:leading-14",
          )}
        >
          {heading} <span className={cn(textGradient)}>{gradientText}</span> {}
        </h1>
      </FadeInVertical>
      <FadeInVertical delay={0.2}>
        <p className={cn(subtitle, "capitalize")}>{subHeading}</p>
      </FadeInVertical>
    </div>
  )
}
export default SectionHeader
