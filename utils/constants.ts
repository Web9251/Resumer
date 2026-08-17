import { FormFields } from "@/utils/schemas"
import {
  FileText,
  History,
  LayoutDashboard,
  ListStart,
  UserPen,
  Clipboard,
} from "lucide-react"
import { RiAiGenerate2 } from "react-icons/ri"

export const navLinks = [
  { href: "/dashboard", Icon: LayoutDashboard, label: "Dashboard" },
  { href: "/history", Icon: History, label: "History" },
  { href: "/generate", Icon: ListStart, label: "Generate" },
]

export const plans = [
  {
    type: "free",
    description: "Best for individuals and early-stage startups",
    price: "0",
    features: [
      "2 cover letters per month",
      "Basic AI generation",
      "1 saved resume",
    ],
  },
  {
    type: "basic",
    description: "Best for growing teams and small businesses",
    price: "9",
    features: [
      "30 cover letters per month",
      "Faster AI generation",
      "3 saved resumes",
      "Generation history",
      "Email support",
    ],
  },
  {
    type: "pro",
    description: "Built for teams ready to scale operations",
    price: "19",
    features: [
      "Unlimited cover letters",
      "Fastest AI generation",
      "Unlimited saved resumes",
      "Full generation history",
      "Priority support",
    ],
  },
]

export const howItWorksContents = [
  {
    Icon: Clipboard,
    title: "Paste your resume",
    description: "No formatting required — plain text works perfectly.",
  },
  {
    Icon: FileText,
    title: "Add job description",
    description: "Paste the job posting you're applying for.",
  },
  {
    Icon: RiAiGenerate2,
    title: "Get cover letter",
    description: "Cover letter in seconds. Copy, download, and send.",
  },
]

export const genAISystem = `You are an expert cover letter writer with years of experience
helping candidates land jobs at top companies. You write cover letters that are:
- Tailored specifically to the job description and company
- Professional but personable, not generic or robotic
- Concise (3-4 paragraphs, under 400 words)
- Focused on relevant achievements and skills from the resume
- Free of clichés like "I am passionate about" or "I am a team player"

Format: plain text only, no markdown, no bullet points.
Start directly with "Dear Hiring Manager," — no preamble.`

export const genAIPrompt = (formData: FormFields) => {
  return `Write a cover letter for this candidate.

${formData.jobTitle ? `Job Title: ${formData.jobTitle}` : ""}
${formData.company ? `Company: ${formData.company}` : ""}

JOB DESCRIPTION:
${formData.jobDescription}

CANDIDATE RESUME:
${formData.resume}

Write the cover letter now:`
}

export const sortHistory = [{ value: "newest" }, { value: "oldest" }]

export const dropDownLinksContent = [
  { label: "Profile", Icon: UserPen, link: "/profile" },
]
