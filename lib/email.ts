import { Resend } from "resend"

export const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendVerificationEmail(to: string, url: string) {
  const { data, error } = await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to,
    subject: "Verify your email address",
    html: `
      <div style="font-family: sans-serif;">
        <h2>Verify your email</h2>
        <p>Click the link below to verify your email address:</p>
        <a href="${url}">Verify my email</a>
        <p>If you didn't request this, you can ignore this email.</p>
      </div>
    `,
  })

  console.error("RESEND ERROR:", error)

  if (error) {
    throw new Error(error.message)
  }

  return data
}
