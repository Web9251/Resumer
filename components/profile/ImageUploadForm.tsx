"use client"

import { AvatarUploadField } from "@/components/profile/AvatarUploadField"
import { useForm } from "react-hook-form"

type Props = {
  initials: string
  image: string | null | undefined
}

function ImageUploadForm({ initials, image }: Props) {
  const { control } = useForm({
    defaultValues: {
      avatar: image ?? null,
    },
  })
  return (
    <div>
      <AvatarUploadField
        control={control}
        name='avatar'
        currentImageUrl={image}
        fallback={initials}
      />
    </div>
  )
}
export default ImageUploadForm
