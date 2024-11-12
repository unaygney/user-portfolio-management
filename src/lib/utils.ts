import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://user-portfolio-management-ten.vercel.app'
    : 'http://localhost:3000'
