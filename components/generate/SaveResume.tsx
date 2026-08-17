"use client"

import { saveResumeAction } from "@/actions/resumeActions"
import TextInput from "@/components/generate/TextInput"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ResumeNameField, saveResumeSchema } from "@/utils/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

type Props = {
  content: string
  isUpdating: boolean
}

function SaveResume({ content, isUpdating }: Props) {
  const [open, setOpen] = useState(false)

  const { handleSubmit, control, reset, watch } = useForm<ResumeNameField>({
    resolver: zodResolver(saveResumeSchema),
    defaultValues: {
      resumeName: "",
    },
  })

  const [isSaving, startSaving] = useTransition()
  const resumeName = watch("resumeName")

  const submitHandler = () => {
    startSaving(async () => {
      const result = await saveResumeAction(resumeName, content)
      if (result.success) {
        toast.success(result.message)
        reset()
        setOpen(false)
        return
      } else {
        toast.error(result.message)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size='xs' variant='outline'>
          Save as new
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form
          onSubmit={(e) => {
            e.stopPropagation()
            handleSubmit(submitHandler)(e)
          }}
        >
          <DialogHeader className='space-y-3'>
            <p>Enter a name for this resume:</p>
            <TextInput
              name='resumeName'
              label='Resume name'
              control={control}
            />
          </DialogHeader>
          <DialogFooter>
            <Button
              variant='outline'
              type='submit'
              disabled={isSaving || isUpdating}
            >
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
export default SaveResume
