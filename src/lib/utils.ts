import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://user-portfolio-management-ten.vercel.app'
    : 'http://localhost:3000'

export function resizeImageToBase64(
  file: File,
  maxWidth = 256,
  maxHeight = 256
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const reader = new FileReader()

    reader.onload = (e) => {
      if (e.target && e.target.result) {
        img.src = e.target.result as string
      }
    }

    reader.onerror = (error) => reject(error)
    reader.readAsDataURL(file)

    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      let width = img.width
      let height = img.height

      if (width > maxWidth || height > maxHeight) {
        if (width > height) {
          height = (maxHeight / width) * height
          width = maxWidth
        } else {
          width = (maxWidth / height) * width
          height = maxHeight
        }
      }

      canvas.width = width
      canvas.height = height

      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height)
        const base64String = canvas.toDataURL('image/jpeg', 0.7)
        resolve(base64String)
      } else {
        reject(new Error('Canvas context could not be created'))
      }
    }

    img.onerror = (error) => reject(error)
  })
}
