"use client"

import { LucideOctagon } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"
import Container from "@/components/global/Container"
import { ModeToggle } from "@/components/global/ModeToggle"
import { navLinks } from "@/utils/constants"
import Sidebar from "@/components/navbar/Sidebar"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { User } from "better-auth"
import { Avatar } from "@/components/ui/avatar"
import DropdownLinks from "@/components/navbar/DropdownLinks"

function Navbar({ user }: { user: User | undefined }) {
  return (
    <header className='bg-background sticky top-0 z-50 border-b border-border'>
      <Container className='py-5'>
        <nav className=''>
          <div className='flex justify-between items-center'>
            {/* Logo */}
            <Link href='/' className='flex justify-center items-center gap-2'>
              <LucideOctagon />
              <span className='text-xl font-semibold font-serif'>RESUMER</span>
            </Link>

            {/* Center */}

            {user && (
              <NavigationMenu className='hidden lg:flex'>
                <NavigationMenuList className='gap-2'>
                  {navLinks.map((navLink) => {
                    const { href, label } = navLink
                    return (
                      <NavigationMenuItem key={href}>
                        <NavigationMenuLink
                          asChild
                          className='text-base font-normal'
                        >
                          <Link href={href}>{label}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )
                  })}
                </NavigationMenuList>
              </NavigationMenu>
            )}

            {/* Left side lg */}

            <div className='hidden lg:flex md:space-x-6'>
              <div className='flex items-center gap-3'>
                <ModeToggle />

                {user ? (
                  <>
                    <DropdownLinks user={user} />
                  </>
                ) : (
                  <Button variant='outline' asChild>
                    <Link href='/sign-in' className='text-base'>
                      Sign In
                    </Link>
                  </Button>
                )}
              </div>
            </div>

            {/* left side sm */}

            <div className='lg:hidden flex justify-center items-center gap-3'>
              <ModeToggle />
              <Sidebar user={user} />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  )
}
export default Navbar
