import { Card, CardContent } from "@/components/ui/card"
import { HowItWorks } from "@/utils/types"

function HowItWorksCard({ Icon, title, description }: HowItWorks) {
  return (
    <Card className='bg-background ring-0 hover:ring-1 w-full py-6'>
      <CardContent className='flex flex-col justify-center items-center text-center space-y-2'>
        <div className='bg-primary/10 p-3 w-fit rounded-lg'>
          <Icon className='size-10 text-primary/80' />
        </div>
        <p className='text-base font-medium'>{title}</p>
        <p className='text-sm text-muted-foreground max-w-100'>{description}</p>
      </CardContent>
    </Card>
  )
}
export default HowItWorksCard
