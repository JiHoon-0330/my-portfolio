import { prisma } from "@/lib/db";
import { getPercent, getPriceGep, priceToNumber } from "@/lib/price";
import { getExchange } from "@/lib/server-api/naver/exchange";
import { MarketStatus } from "@/lib/server-api/naver/naver.type";
import { getEmailFromAuthorization } from "@/lib/server-api/user";
import { Item } from "@prisma/client";
import stringify from "fast-json-stable-stringify";
import { NextRequest } from "next/server";

export type RealtimeInfo = { realtimeTotalAmount: number; datas: Realtime[] };

export type Realtime = {
  marketStatus: MarketStatus;
  closePrice: number;
  priceGap: number;
  percent: number;
  nationName: string | null;
  quantity: number;
};

type CryptoRealTime = {
  isSuccess: boolean;
  detailCode: string;
  message: string;
  result: Record<
    string,
    {
      tradePrice: number;
    }
  >;
};

type StockRealTime = {
  datas:
    | [
        {
          marketStatus: MarketStatus;
          /**
           * "68,400"
           * "175.16"
           */
          closePrice: string;
        },
      ]
    | [];
};

export async function realtime(req: NextRequest): Promise<RealtimeInfo> {
  const email = getEmailFromAuthorization(req);

  const items = await prisma.item.findMany({
    where: {
      userEmail: email,
    },
  });

  const promiseDisconnect = prisma.$disconnect();
  const promiseExchange = getExchange();

  const result = await Promise.all(
    items.map((item) => {
      if (item.url.startsWith("/crypto/")) {
        return cryptoRealtime(item);
      }

      return stockRealtime(item);
    }),
  );

  const exchange = await promiseExchange;

  const realtimeTotalAmount = result.reduce(
    (totalAmount, { nationName, closePrice, quantity }) => {
      if (nationName === "미국") {
        return totalAmount + closePrice * quantity * exchange;
      }

      return totalAmount + closePrice * quantity;
    },
    0,
  );

  await promiseDisconnect;

  return {
    datas: result,
    realtimeTotalAmount,
  };
}

async function cryptoRealtime(item: Item): Promise<Realtime> {
  const resp = await fetch(
    "https://m.stock.naver.com/front-api/v1/realTime/crypto",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: stringify({
        fqnfTickers: [item.reutersCode],
      }),
    },
  );
  const result: CryptoRealTime = await resp.json();

  if (!result.isSuccess) {
    throw new Error(result.message);
  }

  const closePrice = result.result?.[item.reutersCode]?.tradePrice;

  return {
    closePrice,
    nationName: item.nationName,
    quantity: item.quantity,
    marketStatus: "OPEN",
    priceGap: getPriceGep(item.buyPrice, closePrice),
    percent: getPercent(item.buyPrice, closePrice),
  };
}

async function stockRealtime(item: Item): Promise<Realtime> {
  const resp = await fetch(
    `https://polling.finance.naver.com/api/realtime/${item.url.replace(
      "/total",
      "",
    )}`,
  );

  const result: StockRealTime = await resp.json();

  if (result?.datas?.length === 0) {
    throw new Error("No data");
  }

  const closePrice = priceToNumber(result.datas[0].closePrice);

  return {
    closePrice,
    nationName: item.nationName,
    quantity: item.quantity,
    marketStatus: result.datas[0].marketStatus,
    priceGap: getPriceGep(item.buyPrice, closePrice),
    percent: getPercent(item.buyPrice, closePrice),
  };
}
