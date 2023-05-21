import { prisma } from "@/lib/db";
import { priceToNumber } from "@/lib/price";
import { getEmailFromAuthorization } from "@/lib/server-api/user";
import { NextRequest } from "next/server";

export async function dividends(req: NextRequest) {
  const email = getEmailFromAuthorization(req);

  const json: { price: string } = await req.json();

  const price = priceToNumber(json.price);

  if (!price || price <= 0) {
    throw new Error("Invalid price");
  }

  await prisma.dividends.create({
    data: {
      price,
      userEmail: email,
    },
  });

  await prisma.$disconnect();

  return {};
}
