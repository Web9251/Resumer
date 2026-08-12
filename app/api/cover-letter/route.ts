import { streamText, createTextStreamResponse, smoothStream } from "ai"
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { genAIPrompt, genAISystem } from "@/utils/constants"
import { FormFields } from "@/utils/schemas"
import { saveGenerationAction } from "@/actions/generationActions"

export async function POST(req: Request) {
  const { resumeId, ...formData }: FormFields & { resumeId: string } =
    await req.json()

  const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY,
  })
  const prompt = genAIPrompt(formData)

  const result = streamText({
    model: google("gemini-2.5-flash"),
    system: genAISystem,
    prompt,
    onError: ({ error }) => {
      console.log("🚀 ~ POST ~ error:", error)
    },
    experimental_transform: smoothStream({ delayInMs: 50 }),
    onFinish: async ({ text }) => {
      try {
        await saveGenerationAction(formData, resumeId, text)
      } catch (error) {
        console.log("🚀 ~ Failed to save error:", error)
      }
    },
  })

  return createTextStreamResponse({
    stream: result.textStream,
  })
}
