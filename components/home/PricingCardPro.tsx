import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Plan } from "@/utils/types"
import { ArrowRight, Check } from "lucide-react"

function PricingCardPro({ type, description, price, features }: Plan) {
  return (
    <Card className='gap-0 border-none p-0 bg-background h-full'>
      <CardHeader className='w-full p-0 bg-primary/30 flex flex-col items-center flex-1'>
        <div className='flex flex-col justify-between flex-1 p-6 sm:p-8 w-full'>
          <div className='flex flex-col w-full gap-2'>
            <CardTitle className='capitalize text-white'>{type}</CardTitle>
            <CardDescription className=''>{description}</CardDescription>
          </div>
          <div className='flex flex-col w-full gap-6 pb-2'>
            <div className='flex items-baseline w-full gap-2'>
              <span className='text-5xl font-medium tracking-tight text-white font-serif'>
                ${price}
              </span>
              <span className='text-sm text-muted-foreground'>/ per month</span>
            </div>
            <Button
              size='lg'
              className='w-full cursor-pointer gap-2 font-medium bg-white text-black hover:bg-white/80'
            >
              Get Started
              <ArrowRight />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className='p-6 sm:p-8 space-y-3'>
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
export default PricingCardPro
