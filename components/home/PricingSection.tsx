import Container from "@/components/global/Container"
import SectionHeader from "@/components/global/SectionHeader"
import PricingCard from "@/components/home/PricingCard"
import PricingCardPro from "@/components/home/PricingCardPro"
import { FadeInHorizontal } from "@/components/motion/FadeIn"
import { cn } from "@/lib/utils"
import { plans } from "@/utils/constants"
import { sectionFlex, singlePageSections } from "@/utils/styles"

function Pricing() {
  return (
    <section id='pricing' className={cn(singlePageSections)}>
      <Container>
        <div className={cn(sectionFlex)}>
          <SectionHeader
            badgeText='Pricing'
            heading="Start free, upgrade when you're ready"
            subHeading='Generate your first 5 cover letters for free.
            Upgrade to Pro for unlimited generations and priority support.'
          />
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch gap-6'>
            {plans.map((plan, i) => {
              if (plan.type === "pro")
                return (
                  <FadeInHorizontal key={i}>
                    <PricingCardPro {...plan} />
                  </FadeInHorizontal>
                )
              return (
                <FadeInHorizontal key={i}>
                  <PricingCard {...plan} />
                </FadeInHorizontal>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
export default Pricing
