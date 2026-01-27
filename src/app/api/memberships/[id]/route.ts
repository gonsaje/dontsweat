import { NextResponse } from "next/server";
import { z } from "zod";
import { UpdateMembershipInput } from "@/models/membershipInputs";
import { getMembershipById, updateMembershipById } from '@/repo/membershipRepo';

const IdSchema = z.uuid();

type Context = { params: Promise<{ id: string }>};

export async function GET(_req: Request, context: Context) {
    const { id } = await context.params;

    const idParsed = IdSchema.safeParse(id);
    if (!idParsed.success) {
        return NextResponse.json(
            { error: "Invalid membership id", received: id },
            { status: 400 }
        );
    }

    const membership = await getMembershipById(idParsed.data);
    if (!membership) {
        return NextResponse.json({ error: "membership not found" }, { status: 404 });
    }

    return NextResponse.json({membership});
}

export async function PATCH(req: Request, context: Context) {
    
    const { id } = await context.params;

    const idParsed = IdSchema.safeParse(id);
    if (!idParsed.success) {
        return NextResponse.json(
            { error: "Invalid membership id", received: id },
            { status: 400 }
        );
    }

    const body = await req.json().catch(() => null);
    const parsed = UpdateMembershipInput.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json(
            { error: "Invalid payload", issues: parsed.error.issues },
            { status: 400 }
        )
    }


    const membership = await updateMembershipById(idParsed.data, parsed.data);
    if (!membership) {
        return NextResponse.json(
            { error: "membership not found" },
            { status: 404 }
        )
    } 
    return NextResponse.json({ membership });
}

