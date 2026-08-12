import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "@/app/globals.css"
import { cn } from "@/lib/utils"
import Providers from "@/app/Providers"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const serif = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" })

export const metadata: Metadata = {
  title: "Resumer - AI-Powered Resume Analyzer",
  description:
    "Save hours of resume building and analyzing time. Transform your resumes into clear, accurate resume in seconds with our advanced AI technology.",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang='en'
      className={cn(
        "h-full",
        "antialiased",
        "font-sans",
        inter.variable,
        serif.variable,
      )}
      suppressHydrationWarning
    >
      <body className='min-h-full flex flex-col'>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  )
}
