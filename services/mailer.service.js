import { Resend } from 'resend'
import 'dotenv/config'

const resend = new Resend(process.env.RESEND_API_KEY)

async function sendGenericEmail({ to, subject, html, text, replyTo }) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: [to],
      subject,
      html,
      text,
      reply_to: replyTo
    })

    if (error) {
      console.error('RESEND ERROR:', error)
      throw new Error(error.message)
    }

    console.log('EMAIL SENT:', data.id)
    return data
  } catch (err) {
    console.error('RESEND FAIL:', err)
    throw err
  }
}

export {
  sendGenericEmail
}
