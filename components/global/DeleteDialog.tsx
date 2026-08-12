"use client"

import { Trash2Icon } from "lucide-react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { redirect, useRouter } from "next/navigation"
import { useTransition } from "react"

type Props = {
  triggerText: string
  titleText: string
  descriptionText: string
}

function DeleteDialog({ triggerText, titleText, descriptionText }: Props) {
  const router = useRouter()
  const [isDeleting, startTransition] = useTransition()
  const handleDelete = async () => {
    startTransition(async () => {
      const { error } = await authClient.deleteUser()
      if (error) {
        toast.error(error.message || "Failed to delete account")
        return
      }
      toast.success("Account deleted successfully")
      router.replace("/")
      router.refresh()
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' className='cursor-pointer'>
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent
        className='data-open:slide-in-from-bottom-8 data-closed:slide-out-to-bottom-8 data-open:zoom-in-100 data-closed:zoom-out-100 duration-300 [[data-slot=dialog-overlay]:has(~_&)]:duration-300'
        showCloseButton={false}
      >
        <div className='flex flex-col items-center text-center gap-4'>
          <div className='flex items-center justify-center size-12 rounded-full bg-destructive/10 text-destructive'>
            <Trash2Icon size={20} />
          </div>
          <DialogHeader className='items-center'>
            <DialogTitle>{titleText}</DialogTitle>
            <DialogDescription>{descriptionText}</DialogDescription>
          </DialogHeader>
          <div className='flex gap-2 w-full'>
            <DialogClose asChild>
              <Button variant='outline' className='flex-1 cursor-pointer'>
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant='destructive'
              className='flex-1 cursor-pointer'
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default DeleteDialog
