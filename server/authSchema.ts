import { z } from 'zod'

export const authSchema = z.object({
  email: z.string().email({ message: 'Not a valid email address.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' })
    .max(12, { message: "Password can't be longer than 12 characters." })
})

export type AuthSchema = z.infer<typeof authSchema>
