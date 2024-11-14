import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
})
export const createAccountSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter',
    })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Password must contain at least one special character',
    }),
})
export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
})
export const chooseNewPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter',
      })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter',
      })
      .regex(/[0-9]/, { message: 'Password must contain at least one number' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Password must contain at least one special character',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const profileSettingsFormSchema = z.object({
  imageUrl: z.string().optional(),
  email: z.string().email().optional(),
  jobTitle: z.string().optional(),
  name: z.string().optional(),
  bio: z.string().optional(),
})

export type LoginSchema = z.infer<typeof loginSchema>
export type CreateAccountSchema = z.infer<typeof createAccountSchema>
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>
export type ChooseNewPasswordSchema = z.infer<typeof chooseNewPasswordSchema>
export type ProfileSettingsFormSchema = z.infer<
  typeof profileSettingsFormSchema
>
