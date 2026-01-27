import { NextResponse } from "next/server";
import { z } from "zod";
import { UpdateOrgInput } from "@/models/orgInputs";
import { getOrgById, updateOrg } from '@/repo/orgRepo';

const IdSchema = z.uuid();

type Context = { params: Promise<{ id: string }>};

export async function GET(_req: Request, context: Context) {
    const { id } = await context.params;

    const idParsed = IdSchema.safeParse(id);
    if (!idParsed.success) {
        return NextResponse.json(
            { error: "Invalid organization id", received: id },
            { status: 400 }
        );
    }

    const org = await getOrgById(idParsed.data);
    if (!org) {
        return NextResponse.json({ error: "Organization not found" }, { status: 404 });
    }

    return NextResponse.json({org});
}

export async function PATCH(req: Request, context: Context) {
    
    const { id } = await context.params;

    const idParsed = IdSchema.safeParse(id);
    if (!idParsed.success) {
        return NextResponse.json(
            { error: "Invalid organization id", received: id },
            { status: 400 }
        );
    }

    const body = await req.json().catch(() => null);
    const parsed = UpdateOrgInput.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json(
            { error: "Invalid payload", issues: parsed.error.issues },
            { status: 400 }
        )
    }


    const org = await updateOrg(idParsed.data, parsed.data);
    if (!org) {
        return NextResponse.json(
            { error: "Organization not found" },
            { status: 404 }
        )
    } 
    return NextResponse.json({ org });
}

