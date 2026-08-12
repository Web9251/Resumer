import { Button } from "@/components/ui/button"
import Link from "next/link"

function QuickActions() {
  return (
    <div className='flex gap-4 items-center justify-center'>
      <Button variant='outline' asChild>
        <Link href='/generate'>Generate new cover letter</Link>
      </Button>
    </div>
  )
}
export default QuickActions
