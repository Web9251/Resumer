import SignUpForm from "@/components/auth/SignUpForm"
import { currentUser } from "@/hooks/currentUser"
import { cn } from "@/lib/utils"
import { pageSection } from "@/utils/styles"

async function SignUpPage() {
  const user = await currentUser()

  return (
    <div
      className={cn(
        pageSection,
        "flex flex-1 items-center justify-center pt-8",
      )}
    >
      <SignUpForm />
    </div>
  )
}
export default SignUpPage
