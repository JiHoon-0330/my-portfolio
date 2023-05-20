import { decrypt } from "@/lib/crypto";
import { prisma } from "@/lib/db";
import { NextRequest } from "next/server";

export function getTokenByAuthorization(req: NextRequest) {
  return req?.headers?.get("authorization")?.replace("Bearer ", "");
}

export async function getUser(req: NextRequest) {
  const token = getTokenByAuthorization(req);
  const { email = "" } = token ? decrypt(token) : {};

  const user = email
    ? await prisma.user.findUnique({
        where: {
          email,
        },
      })
    : null;

  await prisma.$disconnect();

  return user;
}
