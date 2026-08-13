import Container from "@/components/global/Container"
import SectionHeader from "@/components/global/SectionHeader"
import HowItWorksCard from "@/components/home/HowItWorksCard"
import { FadeInHorizontal } from "@/components/motion/FadeIn"
import { cn } from "@/lib/utils"
import { howItWorksContents } from "@/utils/constants"
import { sectionFlex, singlePageSections } from "@/utils/styles"

function HowItWorks() {
  return (
    <section id='howItWorks' className={cn(singlePageSections)}>
      <Container>
        <div className={cn(sectionFlex, "items-center")}>
          <SectionHeader
            badgeText='How It Works'
            heading='From resume to cover letter in 3 steps'
          />
          <div className='flex flex-col md:flex-row justify-center items-center gap-4'>
            {howItWorksContents.map((item, i) => {
              return (
                <FadeInHorizontal key={item.title} delay={i * 0.2}>
                  <HowItWorksCard {...item} />
                </FadeInHorizontal>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
export default HowItWorks
