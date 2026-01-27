import { z } from "zod";
import { OrgRole } from "@prisma/client";

export const CreateMembershipInput = z.object({
    orgId: z.uuid(),
    userId: z.uuid(),
    role: z.enum(OrgRole)
})

export const UpdateMembershipInput = z.object({
    role: z.enum(OrgRole).optional()
})