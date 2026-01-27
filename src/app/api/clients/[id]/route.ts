import { NextResponse } from "next/server";
import { z } from "zod";
import { UpdateClientInput } from "@/models/clientInputs";
import { getClientById, updateClient } from "@/repo/clientRepo";

const IdSchema = z.uuid();

type Context = { params: { id: string }};

export async function GET(_req: Request, context: Context) {
  const { id } = await context.params;

  const idParsed = IdSchema.safeParse(id);
  if (!idParsed.success) {
    return NextResponse.json(
      { error: "Invalid client id", received: id },
      { status: 400 }
    );
  }

  const client = await getClientById(idParsed.data);
  if (!client) {
    return NextResponse.json({ error: "Client not found" }, { status: 404 });
  }

  return NextResponse.json({ client });
}

export async function PATCH(req: Request, context: Context) {
  const { id } = await context.params;

  const idParsed = IdSchema.safeParse(id);
  if (!idParsed.success) {
    return NextResponse.json(
      { error: "Invalid client id", received: id },
      { status: 400 }
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = UpdateClientInput.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const client = await updateClient(idParsed.data, parsed.data);
  if (!client) {
    return NextResponse.json(
        { error: "Client not found" },
        { status: 404 }
    )
  }
  return NextResponse.json({ client });
}
