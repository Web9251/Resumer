import { LucideOctagon } from "lucide-react"

type Props = {
  headerTitle: string
  headerSubText: string
}

function Header({ headerTitle, headerSubText }: Props) {
  return (
    <div className='flex flex-col items-center'>
      <div className='flex items-center gap-4 mb-2'>
        <LucideOctagon size={40} />
        <span className='text-xl font-semibold font-serif'>RESUMER</span>
      </div>
      <p className='text-2xl capitalize font-semibold'>{headerTitle}</p>
      <p className='text-muted-foreground mt-2'>{headerSubText}</p>
    </div>
  )
}
export default Header
