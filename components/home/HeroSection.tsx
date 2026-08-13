import ButtonAnimatedBorderDemo from "@/components/global/AnimatedBorderButton"
import Container from "@/components/global/Container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { buttonTheme, singlePageSections, subtitle } from "@/utils/styles"

function Hero() {
  return (
    <section id='home' className={cn(singlePageSections)}>
      <Container className='max-w-4xl'>
        <div className='flex flex-col items-center text-center gap-4 sm:gap-5'>
          <Badge variant='outline' className='text-xs sm:text-sm p-3 '>
            AI-powered cover letters
          </Badge>
          <h1 className='text-display font-medium max-w-190'>
            Tailored cover letters in seconds
          </h1>
          <p className={cn(subtitle)}>
            Paste your resume and job description. Get a personalized,
            professional cover letter instantly — no templates, no fluff.
          </p>
          <div className='flex gap-3'>
            <ButtonAnimatedBorderDemo />
            <Button
              size='xlg'
              className={cn(buttonTheme, "capitalize")}
              asChild
            >
              <a href='#howItWorks'>See how it works</a>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
export default Hero
