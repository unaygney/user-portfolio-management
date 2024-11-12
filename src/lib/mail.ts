import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.HOTMAIL_EMAIL,
    pass: process.env.HOTMAIL_PASSWORD,
  },
})

export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.HOTMAIL_EMAIL,
      to,
      subject,
      text,
    })
    console.log('Email sended:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('encountered a error when email sending:', error)
    return { success: false, error }
  }
}
