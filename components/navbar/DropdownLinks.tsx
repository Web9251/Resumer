"use client"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Separator } from "../ui/separator"
import { Button } from "../ui/button"
import { LogOut } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { User } from "better-auth"
import { dropDownLinksContent } from "@/utils/constants"
import Link from "next/link"

function DropdownLinks({ user }: { user: User }) {
  const router = useRouter()

  const initials = user.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const clickHandler = async () => {
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='rounded-full'>
          <Avatar>
            <AvatarImage src={user.image!} alt='user' />
            <AvatarFallback className='capitalize'>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className='space-y-2 w-50'
        align='end'
        sideOffset={10}
      >
        <DropdownMenuLabel className='flex items-center gap-3'>
          <Avatar>
            <AvatarImage src={user.image!} alt='user' />
            <AvatarFallback className='capitalize'>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className='text-primary capitalize text-sm'>{user.name}</p>
            {user.email}
          </div>
        </DropdownMenuLabel>

        <Separator />
        {dropDownLinksContent.map((item) => {
          const { label, Icon, link } = item
          return (
            <DropdownMenuItem key={label} asChild>
              <Link href={link}>
                <Icon />
                <span className='ml-1'>{label}</span>
              </Link>
            </DropdownMenuItem>
          )
        })}
        <Separator />
        <DropdownMenuItem
          variant='destructive'
          className='capitalize gap-3'
          onClick={clickHandler}
        >
          <LogOut />
          sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default DropdownLinks
