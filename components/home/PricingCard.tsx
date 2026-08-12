import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Plan } from "@/utils/types"
import { ArrowRight, Check } from "lucide-react"
import Link from "next/link"

function PricingCard({ type, description, price, features }: Plan) {
  return (
    <Card className='flex flex-col p-6 sm:p-8 gap-6 sm:gap-8 bg-background h-full'>
      <CardHeader className='flex flex-col w-full gap-8 p-0 flex-1'>
        <div className='flex flex-col w-full gap-2'>
          <CardTitle className='capitalize'>{type}</CardTitle>
          <CardDescription className=''>{description}</CardDescription>
        </div>
        <div className='flex flex-col w-full gap-6'>
          <div className='flex items-baseline w-full gap-2'>
            <span className='text-5xl font-medium tracking-tight text-foreground font-serif'>
              ${price}
            </span>
            <span className='text-sm text-muted-foreground'>/ per month</span>
          </div>

          <Button
            size='lg'
            className='w-full cursor-pointer gap-2 font-medium bg-foreground text-background hover:bg-foreground/80 hover:text'
            asChild
          >
            <Link href={type === "free" ? "/generate" : ""}>
              Get Started
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </CardHeader>

      <Separator className='mt-1' />

      <CardContent className='p-0 space-y-3 flex-1 '>
        <p className='capitalize text-sm font-normal text-muted-foreground'>
          What&apos;s included
        </p>
        <ul className='space-y-3'>
          {features.map((feature) => {
            return (
              <li key={feature} className='flex items-center gap-3'>
                <Check className='text-muted-foreground' />
                <span className='text-sm font-normal text-muted-foreground'>
                  {feature}
                </span>
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}
export default PricingCard
