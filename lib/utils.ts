import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import * as z from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const validateWithZod = async <T>(
  data: unknown,
  schema: z.ZodType<T>,
): Promise<T> => {
  const validatedData = await schema.safeParse(data)
  if (!validatedData.success) {
    const errors = validatedData.error.issues.map((error) => error.message)
    throw new Error(errors.join(","))
  }
  return validatedData.data
}
