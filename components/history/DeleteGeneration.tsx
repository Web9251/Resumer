"use client"

import { Loader2, Trash, Trash2Icon } from "lucide-react"
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
import { deleteGeneration } from "@/actions/generationActions"
import { useState, useTransition } from "react"
import { toast } from "sonner"

function DeleteGeneration({ id }: { id: string }) {
  const [isDeleting, startDeleting] = useTransition()
  const [open, setOpen] = useState(false)

  const handleDelete = (id: string) => {
    startDeleting(async () => {
      const result = await deleteGeneration(id)
      if (result.success) {
        toast.success(result.message)
        setOpen(false)
        return
      } else {
        toast.error(result.message)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className='w-full justify-start'>
        <Button variant='destructive' className='pl-1.5'>
          <Trash className='size-4 mr-2' /> Delete
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
            <DialogTitle>Delete Item</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this item? This action cannot be
              undone and the data will be permanently removed.
            </DialogDescription>
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
              onClick={() => handleDelete(id)}
              disabled={isDeleting}
            >
              {isDeleting ? <Loader2 className='animate-spin' /> : "Delete"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteGeneration
