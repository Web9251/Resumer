import { currentUser } from "@/hooks/currentUser"
import { PiHandWavingBold } from "react-icons/pi"

async function DashboardHeader() {
  const user = await currentUser()

  return (
    <div className='flex flex-col items-center'>
      <div className='flex gap-3 items-center'>
        <h1 className='text-2xl'>
          Hello, <span className='capitalize'>{user?.name}</span>
        </h1>
        <PiHandWavingBold className='size-6' />
      </div>
      <p className='text-sm text-muted-foreground'>
        Here&apos;s an overview of your activity
      </p>
    </div>
  )
}
export default DashboardHeader
