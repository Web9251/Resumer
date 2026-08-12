import CTA from "@/components/home/CTASection"
import Hero from "@/components/home/HeroSection"
import HowItWorks from "@/components/home/HowItWorksSection"
import Pricing from "@/components/home/PricingSection"
import { FadeInVertical } from "@/components/motion/FadeIn"

export default async function Home() {
  return (
    <main>
      <FadeInVertical>
        <Hero />
      </FadeInVertical>
      <Pricing />
      <HowItWorks />
      <FadeInVertical>
        <CTA />
      </FadeInVertical>
    </main>
  )
}
