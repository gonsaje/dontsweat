import { NextResponse } from "next/server";
import { z } from "zod";
import { CreateClientInput } from "@/models/clientInputs";
import { createClient, listClients } from "@/repo/clientRepo";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const orgId = url.searchParams.get("orgId");

  const parsed = z.string().uuid().safeParse(orgId);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "orgId (uuid) query param is required" },
      { status: 400 }
    );
  }

  const clients = await listClients(parsed.data);
  return NextResponse.json({ clients });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = CreateClientInput.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const client = await createClient(parsed.data);
  return NextResponse.json({ client }, { status: 201 });
}

