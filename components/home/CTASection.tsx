import Container from "@/components/global/Container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  buttonTheme,
  singlePageSections,
  subtitle,
  textGradient,
} from "@/utils/styles"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

function CTA() {
  return (
    <section id='cta' className={cn(singlePageSections)}>
      <Container className='max-w-4xl'>
        <div className='flex flex-col items-center text-center gap-4 sm:gap-5'>
          <Badge variant='outline' className='text-xs sm:text-sm p-3'>
            Ready to get started?
          </Badge>
          <h1 className='text-display font-medium max-w-190'>
            Your next cover letter is{" "}
            <span className={cn(textGradient, "whitespace-nowrap")}>
              30 seconds away
            </span>
          </h1>
          <p className={cn(subtitle)}>
            Join hundreds of job seekers already using CoverAI to write cover
            letters that actually get responses.
          </p>
          <Button size='xlg' className={cn(buttonTheme, "capitalize")} asChild>
            <Link href='/generate'>
              Generate for free
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}
export default CTA
