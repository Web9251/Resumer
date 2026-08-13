import Navbar from "@/components/navbar/Navbar"
import { currentUser } from "@/hooks/currentUser"
import { ReactNode } from "react"

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const user = await currentUser()
  console.log("🚀 ~ DashboardLayout ~ user:", user)
  return (
    <>
      <Navbar user={user} />
      {children}
    </>
  )
}
