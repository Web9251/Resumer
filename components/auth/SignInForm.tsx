"use client"

import CardWrapper from "@/components/auth/CardWrapper"

function SignInForm() {
  return (
    <CardWrapper
      headerTitle='Welcome to Resumer'
      headerSubText='Sign in to continue'
      showSocial
    />
  )
}
export default SignInForm
