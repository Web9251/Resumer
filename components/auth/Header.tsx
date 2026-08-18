import { LucideOctagon } from "lucide-react"
import Link from "next/link"

type Props = {
  headerTitle: string
  headerSubText: string
}

function Header({ headerTitle, headerSubText }: Props) {
  return (
    <div className='flex flex-col items-center'>
      <div className='flex items-center gap-4 mb-2'>
        <Link href='/'>
          <LucideOctagon size={40} />
        </Link>
      </div>
      <p className='text-2xl capitalize font-semibold'>{headerTitle}</p>
      <p className='text-muted-foreground mt-2'>{headerSubText}</p>
    </div>
  )
}
export default Header
