"use client"

import { updateUsernameAction } from "@/actions/userActions"
import TextInput from "@/components/generate/TextInput"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { UpdateNameField, updateNameSchema } from "@/utils/schemas"
import { buttonTheme } from "@/utils/styles"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

function UpdatePersonalInfo({ name }: { name: string }) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateNameField>({
    resolver: zodResolver(updateNameSchema),
    defaultValues: {
      name,
    },
  })

  const submitHandler = async (formData: UpdateNameField) => {
    const result = await updateUsernameAction(formData.name)
    if (result.success) {
      toast.success(result.message)
      return
    } else toast.error(result.message)
  }

  return (
    <Card className='bg-background'>
      <CardHeader>Name</CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(submitHandler)}>
          <TextInput name='name' control={control} hideLabel={true} />
          <Button
            className={cn(buttonTheme)}
            type='submit'
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save name"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
export default UpdatePersonalInfo
