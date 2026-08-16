import SignInForm from "@/components/auth/SignInForm"
import { cn } from "@/lib/utils"
import { pageSection } from "@/utils/styles"

type Props = {
  searchParams: Promise<{
    callbackUrl: string
  }>
}

async function SignInPage({ searchParams }: Props) {
  const callbackUrl = (await searchParams).callbackUrl

  return (
    <section
      className={cn(pageSection, "flex flex-1 items-center justify-center")}
    >
      <SignInForm callbackUrl={callbackUrl} />
    </section>
  )
}
export default SignInPage
