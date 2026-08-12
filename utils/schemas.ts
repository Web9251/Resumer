import * as z from "zod"

export const resumeSchema = z
  .string()
  .trim()
  .min(100, { message: "Resume must be at least 100 characters" })
  .max(5000, { message: "Resume must be at most 5000 characters" })

export const formSchema = z.object({
  resume: z
    .string()
    .trim()
    .min(100, { message: "Resume must be at least 100 characters" })
    .max(5000, { message: "Resume must be at most 5000 characters" }),

  resumeContent: z.string(),
  jobDescription: z
    .string()
    .trim()
    .min(20, { message: "Job description must be at least 20 characters" })
    .max(200, { message: "Job description must be at most 200 characters" }),
  jobTitle: z
    .string()
    .trim()
    .max(50, { message: "Job title must be at most 50 characters" }),
  company: z
    .string()
    .trim()
    .max(50, { message: "Company must be at most 50 characters" }),
})

export const saveResumeSchema = z.object({
  resumeName: z
    .string()
    .min(1, { message: "Resume name is required" })
    .max(20, { message: "Resume name must be at most 20 characters" }),
})

export const signInSchema = z.object({
  email: z.email({ message: "Email required" }),
  password: z.string().min(1, { message: "Password required" }),
})

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "At least 2 characters required" })
      .max(100, { message: "name must be at most 100 characters" }),

    email: z.email({ message: "Email required" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords does not match",
    path: ["confirmPassword"], // error appears on confirmPassword field
  })

export const updateNameSchema = z.object({
  name: z
    .string()
    .min(2, { message: "At least 2 characters required" })
    .max(100, { message: "name must be at most 100 characters" }),
})

export const updatePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords does not match",
    path: ["confirmPassword"],
  })

export type Resume = z.infer<typeof resumeSchema>
export type FormFields = z.infer<typeof formSchema>
export type ResumeNameField = z.infer<typeof saveResumeSchema>
export type signInFields = z.infer<typeof signInSchema>
export type signUpFields = z.infer<typeof signUpSchema>
export type UpdateNameField = z.infer<typeof updateNameSchema>
export type UpdatePasswordField = z.infer<typeof updatePasswordSchema>
