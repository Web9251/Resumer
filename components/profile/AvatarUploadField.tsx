"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Control, FieldPath, FieldValues, useController } from "react-hook-form"
import { Camera, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useUploadThing } from "@/lib/uploadthing"
import { removeAvatarAction } from "@/actions/userActions"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AvatarUploadFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>

  currentImageUrl?: string | null
  fallback?: string
  label?: string
  onAvatarChange?: (url: string | null) => void
}

export function AvatarUploadField<TFieldValues extends FieldValues>({
  control,
  name,
  currentImageUrl,
  fallback = "?",
  onAvatarChange,
}: AvatarUploadFieldProps<TFieldValues>) {
  const router = useRouter()
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [preview, setPreview] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [isRemoving, startRemoveTransition] = React.useTransition()

  const { field, fieldState } = useController({ control, name })

  const clearPreview = () => {
    setPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return null
    })
  }

  const { startUpload, isUploading } = useUploadThing("avatarUploader", {
    onClientUploadComplete: (res) => {
      const url = res?.[0]?.ufsUrl
      if (url) {
        field.onChange(url)
        onAvatarChange?.(url)
        router.refresh()
      }
      clearPreview()
    },
    onUploadError: (err) => {
      setError(err.message)
      clearPreview()
    },
  })

  const handleRemove = () => {
    setError(null)
    startRemoveTransition(async () => {
      try {
        await removeAvatarAction()
        field.onChange(null)
        onAvatarChange?.(null)
        clearPreview()
        router.refresh()
      } catch (err) {
        setError(err instanceof Error ? err.message : "Couldn't remove photo")
      }
    })
  }

  React.useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  const handleSelect = (files: FileList | null) => {
    const file = files?.[0]
    if (!file) return
    setError(null)
    setPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return URL.createObjectURL(file)
    })
    startUpload([file])
  }

  const resolvedValue =
    field.value === undefined ? currentImageUrl : field.value
  const displayedSrc = preview ?? resolvedValue ?? undefined
  const errorMessage = error ?? fieldState.error?.message
  const hasImage = Boolean(displayedSrc)
  const isBusy = isUploading || isRemoving

  return (
    <div className='grid gap-2'>
      <div className='flex items-center gap-4'>
        <div className='relative'>
          <button
            type='button'
            disabled={isBusy}
            onClick={() => inputRef.current?.click()}
            className='group relative block overflow-hidden rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed'
          >
            <Avatar className='h-20 w-20'>
              <AvatarImage src={displayedSrc} alt='Profile photo' />
              <AvatarFallback className='text-lg'>{fallback}</AvatarFallback>
            </Avatar>
            <span
              className={cn(
                "absolute inset-0 flex items-center justify-center rounded-full text-transparent transition-colors",
                isBusy
                  ? "bg-black/40 text-white"
                  : "bg-black/0 group-hover:bg-black/40 group-hover:text-white",
              )}
            >
              {isBusy ? (
                <Loader2 className='h-5 w-5 animate-spin' />
              ) : (
                <Camera className='h-5 w-5' />
              )}
            </span>
          </button>

          <input
            ref={inputRef}
            id={name}
            type='file'
            accept='image/png,image/jpeg,image/webp'
            className='hidden'
            onChange={(e) => {
              handleSelect(e.target.files)
              e.target.value = ""
            }}
          />
        </div>

        <div className='flex flex-col items-start gap-1 text-sm'>
          <button
            type='button'
            disabled={isBusy}
            onClick={() => inputRef.current?.click()}
            className='font-medium hover:underline disabled:pointer-events-none disabled:opacity-50'
          >
            {isUploading ? "Uploading…" : "Change photo"}
          </button>

          {hasImage && (
            <button
              type='button'
              disabled={isBusy}
              onClick={handleRemove}
              className='text-muted-foreground hover:text-destructive hover:underline disabled:pointer-events-none disabled:opacity-50'
            >
              {isRemoving ? "Removing…" : "Remove photo"}
            </button>
          )}

          <span className='text-xs text-muted-foreground'>
            PNG, JPG or WEBP, up to 4MB
          </span>
        </div>
      </div>

      {errorMessage && (
        <p className='text-sm font-medium text-destructive'>{errorMessage}</p>
      )}
    </div>
  )
}
