"use client"

import { useMediaQuery } from "@/hooks/useMediaQuery"
import { useEffect, useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { LogOut, LucideOctagon, Menu } from "lucide-react"
import { navLinks } from "@/utils/constants"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonTheme } from "@/utils/styles"
import { User } from "better-auth"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"

function Sidebar({ user }: { user: User | undefined }) {
  const [open, setOpen] = useState(false)

  const isDesktop = useMediaQuery("(min-width: 1024px)")
  useEffect(() => {
    if (isDesktop) {
      setOpen(false)
    }
  }, [isDesktop])

  const router = useRouter()
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/")
          router.refresh()
        },
      },
    })
  }

  return (
    <Sheet open={!isDesktop && open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant='outline'>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className='px-6 pt-5'>
        {/* Logo */}
        <div className='flex items-center gap-2 '>
          <LucideOctagon />
          <span className='text-xl font-medium tracking-tighter'>RESUMER</span>
        </div>

        {user && (
          <div className='mt-10 flex flex-col gap-4'>
            {navLinks.map((navLink) => {
              const { href, label } = navLink
              return (
                <Link
                  key={href}
                  href={href}
                  className=' hover:text-primary text-[16px] font-medium'
                >
                  {label}
                </Link>
              )
            })}
          </div>
        )}

        {user ? (
          <Button
            variant='destructive'
            onClick={handleSignOut}
            className={cn("w-full mt-6 text-destructive")}
            asChild
          >
            <Link href='/sign-in'>
              <LogOut className='mr-2' />
              Sign Out
            </Link>
          </Button>
        ) : (
          <Button className={cn("w-full mt-6", buttonTheme)} asChild>
            <Link href='/sign-in'>Sign In</Link>
          </Button>
        )}
      </SheetContent>
    </Sheet>
  )
}
export default Sidebar
