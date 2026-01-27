import { z } from "zod";

export const CreateUserInput = z.object({
    email: z.email(),
    firstName: z.string().min(1).max(100),
    lastName: z.string().min(1).max(100)
})

export const UpdateUserInput = z.object({
    email: z.email().optional(),
    firstName: z.string().min(1).max(100).optional(),
    lastName: z.string().min(1).max(100).optional()
})