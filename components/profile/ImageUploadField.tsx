"use client"

import * as React from "react"
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form"
import { ImagePlus, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Image from "next/image"

interface ImageUploadFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  label?: string
  description?: string
  maxSizeMb?: number
  accept?: string
}

/**
 * A drag-and-drop image upload field for use inside a react-hook-form <form>.
 * The field value is the raw File (or null) — wire it up to your zod/yup
 * schema as `z.instanceof(File).nullable()` or similar.
 *
 * Usage:
 *   const form = useForm<{ avatar: File | null }>({ defaultValues: { avatar: null } })
 *   <ImageUploadField control={form.control} name="avatar" label="Avatar" />
 */
export function ImageUploadField<TFieldValues extends FieldValues>({
  control,
  name,
  label = "Image",
  description = "PNG, JPG or WEBP, up to 5MB",
  maxSizeMb = 5,
  accept = "image/png,image/jpeg,image/webp",
}: ImageUploadFieldProps<TFieldValues>) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [preview, setPreview] = React.useState<string | null>(null)
  const [isDragging, setIsDragging] = React.useState(false)

  // Revoke the object URL when the component unmounts or the preview changes
  React.useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        validate: (value) => {
          const file = value as File | null
          if (!file) return true
          if (!accept.split(",").includes(file.type)) {
            return "Unsupported file type"
          }
          if (file.size > maxSizeMb * 1024 * 1024) {
            return `File must be smaller than ${maxSizeMb}MB`
          }
          return true
        },
      }}
      render={({ field, fieldState }) => {
        const setFile = (file: File | null) => {
          field.onChange(file)
          setPreview((prev) => {
            if (prev) URL.revokeObjectURL(prev)
            return file ? URL.createObjectURL(file) : null
          })
        }

        const handleFiles = (files: FileList | null) => {
          setFile(files?.[0] ?? null)
        }

        return (
          <div className='grid gap-2'>
            <Label htmlFor={name}>{label}</Label>

            <div
              role='button'
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  inputRef.current?.click()
              }}
              onDragOver={(e) => {
                e.preventDefault()
                setIsDragging(true)
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault()
                setIsDragging(false)
                handleFiles(e.dataTransfer.files)
              }}
              onClick={() => inputRef.current?.click()}
              className={cn(
                "relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-6 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/25 hover:border-muted-foreground/40",
                fieldState.error && "border-destructive",
              )}
            >
              <input
                ref={inputRef}
                id={name}
                type='file'
                accept={accept}
                className='hidden'
                onChange={(e) => handleFiles(e.target.files)}
                onBlur={field.onBlur}
              />

              {preview ? (
                <div className='relative'>
                  <Image
                    src={preview}
                    alt='Selected preview'
                    className='mx-auto h-32 w-32 rounded-md object-cover'
                  />
                  <Button
                    type='button'
                    variant='secondary'
                    size='icon'
                    className='absolute -right-2 -top-2 h-6 w-6 rounded-full shadow'
                    onClick={(e) => {
                      e.stopPropagation()
                      setFile(null)
                      if (inputRef.current) inputRef.current.value = ""
                    }}
                  >
                    <X className='h-3 w-3' />
                    <span className='sr-only'>Remove image</span>
                  </Button>
                </div>
              ) : (
                <>
                  <div className='flex h-10 w-10 items-center justify-center rounded-full bg-muted'>
                    <ImagePlus className='h-5 w-5 text-muted-foreground' />
                  </div>
                  <div className='text-sm'>
                    <span className='font-medium text-primary'>
                      Click to upload
                    </span>{" "}
                    <span className='text-muted-foreground'>
                      or drag and drop
                    </span>
                  </div>
                  <p className='text-xs text-muted-foreground'>{description}</p>
                </>
              )}
            </div>

            {fieldState.error && (
              <p className='text-sm font-medium text-destructive'>
                {fieldState.error.message}
              </p>
            )}
          </div>
        )
      }}
    />
  )
}
