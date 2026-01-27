import { z } from "zod";

export const CreateClientInput = z.object({
  orgId: z.uuid(),
  name: z.string().min(1).max(100),
  notes: z.string().max(2000).optional(),
  userId: z.uuid().optional(),
});

export const UpdateClientInput = z.object({
  name: z.string().min(1).max(100).optional(),
  notes: z.string().max(2000).optional().nullable(),
  archived: z.boolean().optional(),
});
