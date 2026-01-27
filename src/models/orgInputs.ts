import { z } from "zod";

export const CreateOrgInput = z.object({
    name: z.string().min(1).max(100)
})

export const UpdateOrgInput = z.object({
        name: z.string().min(1).max(100).optional()
})