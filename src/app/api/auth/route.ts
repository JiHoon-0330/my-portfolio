import { getUser } from "@/lib/server-api/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const user = await getUser(req);

  return NextResponse.json(user);
}
