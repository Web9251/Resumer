"use client"

import CardWrapper from "@/components/auth/CardWrapper"

function SignInForm({ callbackUrl }: { callbackUrl: string | undefined }) {
  return (
    <CardWrapper
      headerTitle='Welcome to Resumer'
      headerSubText='Sign in to continue'
      callbackUrl={callbackUrl}
      footerLink='/'
      footerLinkLabel='Back to home'
    />
  )
}
export default SignInForm
