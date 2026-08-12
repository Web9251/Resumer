"use client"

import TextInput from "@/components/generate/TextInput"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"
import { UpdatePasswordField, updatePasswordSchema } from "@/utils/schemas"
import { buttonTheme } from "@/utils/styles"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

function UpdatePassword() {
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { isSubmitting },
  } = useForm<UpdatePasswordField>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })
  const currentPassword = getValues("currentPassword")
  const newPassword = getValues("newPassword")

  const submitHandler = async () => {
    const { error } = await authClient.changePassword({
      currentPassword: currentPassword,
      newPassword: newPassword,
    })

    if (error) {
      toast.error(error.message || "Failed to update password")
      return
    }
    toast.success("Password updated successfully")
    reset()
  }

  return (
    <Card className='bg-background'>
      <CardHeader>Password</CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(submitHandler)}>
          <TextInput
            name='currentPassword'
            control={control}
            type='password'
            hideLabel={true}
            placeholder='Current password'
          />
          <TextInput
            name='newPassword'
            control={control}
            type='password'
            hideLabel={true}
            placeholder='New password'
          />
          <TextInput
            name='confirmPassword'
            control={control}
            type='password'
            hideLabel={true}
            placeholder='Confirm password'
          />

          <Button
            className={cn(buttonTheme)}
            type='submit'
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
export default UpdatePassword
