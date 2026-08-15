import SignInForm from "@/components/auth/SignInForm"
import { cn } from "@/lib/utils"
import { pageSection } from "@/utils/styles"

async function SignInPage() {
  return (
    <section
      className={cn(pageSection, "flex flex-1 items-center justify-center")}
    >
      <SignInForm />
    </section>
  )
}
export default SignInPage
