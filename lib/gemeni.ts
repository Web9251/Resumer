import { google } from "@ai-sdk/google"
import { streamText } from "ai"
import { createStreamableValue } from "@ai-sdk/rsc"
import { genAIPrompt, genAISystem } from "@/utils/constants"
import { Description, Resume } from "@/utils/schemas"

type GenerateInput = {
  resume: Resume
  description: Description
}

export const generateCoverLetter = async (formData: Resume & Description) => {
  // if (!resume.trim() || jobDescription.trim()) {
  //   throw new Error("Resume and job description is required!")
  // }

  const prompt = genAIPrompt(formData)
  const stream = createStreamableValue("")

  ;(async () => {
    const { textStream } = streamText({
      model: google("gemini-2.5-flash"),
      system: genAISystem,
      prompt,
    })

    for await (const chunk of textStream) {
      stream.update(chunk)
    }
    stream.done()
  })()

  return stream.value
}
