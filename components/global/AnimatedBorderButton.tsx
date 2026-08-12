import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const ButtonAnimatedBorderDemo = () => {
  return (
    <div className='w-fit h-fit relative inline-flex rounded-md overflow-hidden'>
      {/* Animated gradient border */}
      <span className='absolute inset-0 rounded-md pointer-events-none overflow-hidden'>
        <span className='absolute -inset-full animate-spin animation-duration-[4s] bg-[conic-gradient(from_0deg,#2b7fff_0deg,#2b7fff_40deg,transparent_60deg)]' />
      </span>

      <Button
        variant='outline'
        size='xlg'
        className='relative z-10 m-px rounded-md bg-background dark:bg-background hover:bg-background dark:hover:bg-background shadow-none cursor-pointer'
        asChild
      >
        <Link href='/generate'>
          Get Started
          <ArrowRight />
        </Link>
      </Button>
    </div>
  )
}

export default ButtonAnimatedBorderDemo
