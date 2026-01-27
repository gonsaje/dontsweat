import { NextResponse } from "next/server";
import { z } from "zod";
import { UpdateUserInput } from "@/models/userInputs";
import { getUserById, updateUser } from '@/repo/userRepo';

const IdSchema = z.uuid();

type Context = { params: { id: string }};

export async function GET(_req: Request, context: Context) {
    const { id } = await context.params;

    const idParsed = IdSchema.safeParse(id);
    if (!idParsed.success) {
        return NextResponse.json(
            { error: "Invalid user id", received: id },
            { status: 400 }
        );
    }

    const user = await getUserById(idParsed.data);
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({user});
}

export async function PATCH(req: Request, context: Context) {
    
    const { id } = await context.params;

    const idParsed = IdSchema.safeParse(id);
    if (!idParsed.success) {
        return NextResponse.json(
            { error: "Invalid user id", received: id },
            { status: 400 }
        );
    }

    const body = await req.json().catch(() => null);
    const parsed = UpdateUserInput.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json(
            { error: "Invalid payload", issues: parsed.error.issues },
            { status: 400 }
        )
    }


    const user = await updateUser(idParsed.data, parsed.data);
    if (!user) {
        return NextResponse.json(
            { error: "User not found" },
            { status: 404 }
        )
    }
    return NextResponse.json({ user });
}

