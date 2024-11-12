import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export const runtime = 'nodejs'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.HOTMAIL_EMAIL,
    pass: process.env.HOTMAIL_PASSWORD,
  },
})

type SendEmailOptions = {
  to: string
  subject: string
  text: string
  from?: string
}

export async function POST(req: Request) {
  const apiKey = req.headers.get('x-api-key')

  if (apiKey !== process.env.API_KEY) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const {
      to,
      subject,
      text,
      from = process.env.HOTMAIL_EMAIL,
    } = (await req.json()) as SendEmailOptions

    const info = await transporter.sendMail({
      from,
      to,
      subject,
      text,
    })

    console.log('Email sent:', info.messageId)

    return NextResponse.json({ success: true, messageId: info.messageId })
  } catch (error) {
    console.error('Encountered an error when sending email:', error)
    return NextResponse.json(
      { success: false, error: 'error' },
      { status: 500 }
    )
  }
}
