import { NextResponse } from "next/server";
import { bootstrap } from "@/repo/bootstrap";

export async function POST() {
  const result = await bootstrap({
    orgName: "DontSweat",
    email: "admin@dontsweat.local",
    firstName: "Admin",
    lastName: "User",
  });

  return NextResponse.json(result);
}
