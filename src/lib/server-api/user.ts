import { decrypt } from "@/lib/crypto";
import { prisma } from "@/lib/db";
import { getExchange } from "@/lib/server-api/naver/exchange";
import { Dividends, Item, Sell, User } from "@prisma/client";
import { NextRequest } from "next/server";

export function getTokenByAuthorization(req: NextRequest) {
  const token = req?.headers?.get("authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new Error("Token not found");
  }

  return token;
}

export function getEmailFromAuthorization(req: NextRequest) {
  const token = getTokenByAuthorization(req);
  const { email } = decrypt(token);

  return email;
}

export type UserInfo = User & {
  items: Item[];
  sells: Sell[];
  dividends: Dividends[];
  totalAmount: number;
  hasAmount: number;
  sellAmount: number;
  dividendsAmount: number;
};

export async function getUserInfo(req: NextRequest) {
  const email = getEmailFromAuthorization(req);

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      items: true,
      sells: true,
      dividends: true,
    },
  });

  await prisma.$disconnect();

  if (!user) {
    throw new Error("User not found");
  }

  const exchange = await getExchange();

  const hasAmount = user.items?.reduce(
    (total, { buyPrice, quantity, nationName }) => {
      if (nationName === "미국") {
        return total + buyPrice * quantity * exchange;
      }

      return total + buyPrice * quantity;
    },
    0,
  );

  const sellAmount = user.sells?.reduce(
    (total, { sellPrice, quantity, nationName }) => {
      if (nationName === "미국") {
        return total + sellPrice * quantity * exchange;
      }

      return total + sellPrice * quantity;
    },
    0,
  );

  const dividendsAmount = user.dividends?.reduce((total, { price }) => {
    return total + price;
  }, 0);

  return Object.assign(user, {
    hasAmount,
    sellAmount,
    dividendsAmount,
    totalAmount: hasAmount + sellAmount,
  });
}
