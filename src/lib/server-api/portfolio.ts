import { prisma } from "@/lib/db";
import { getPriceGep, priceToNumber } from "@/lib/price";
import { getEmailFromAuthorization } from "@/lib/server-api/user";
import { Item } from "@prisma/client";
import { NextApiRequest } from "next";
import z from "zod";

const inputItemScheme = z.object({
  code: z.string(),
  name: z.string(),
  typeCode: z.string(),
  typeName: z.string(),
  url: z.string(),
  reutersCode: z.string(),
  nationCode: z.string().nullable(),
  nationName: z.string().nullable(),
  buyPrice: z.number().min(0.01),
  quantity: z.number().min(0.000000001),
});

function parseAddStock(
  item: Omit<InputItem, "buyPrice" | "quantity"> & {
    buyPrice: string;
    quantity: string;
  },
) {
  return {
    ...item,
    buyPrice: priceToNumber(item.buyPrice),
    quantity: +item.quantity,
  };
}

export type InputItem = Omit<
  Item,
  "id" | "createdAt" | "updatedAt" | "user" | "userEmail"
>;

export async function addStock(req: NextApiRequest) {
  const email = getEmailFromAuthorization(req);

  const json = JSON.parse(req.body);
  console.log({ email, json });
  const item = parseAddStock(json);

  if (!inputItemScheme.safeParse(item).success) {
    try {
      inputItemScheme.parse(item);
    } catch (e) {
      console.error(e);
    }
    throw new Error("Invalid stock data");
  }

  await prisma.item.create({
    data: {
      ...item,
      userEmail: email,
    },
  });

  await prisma.$disconnect();

  return item;
}

const updateStockScheme = inputItemScheme
  .omit({
    buyPrice: true,
  })
  .merge(
    z.object({
      id: z.number().min(1),
      type: z.enum(["buy", "sell"]).nullish(),
      price: z.number().min(0.01),
    }),
  );

function parseUpdateStock(
  item: z.infer<typeof updateStockScheme> & {
    price: string;
    quantity: string;
  },
) {
  return {
    ...item,
    price: priceToNumber(item.price),
    quantity: +item.quantity,
  };
}

export async function updateStock(req: NextApiRequest) {
  const id = +(req.query.id as string);

  if (!id) {
    throw new Error("Invalid id");
  }

  const email = getEmailFromAuthorization(req);

  const json = JSON.parse(req.body);
  const item = parseUpdateStock({ ...json, id });

  if (!updateStockScheme.safeParse(item).success) {
    try {
      updateStockScheme.parse(item);
    } catch (e) {
      console.error(e);
    }
    throw new Error("Invalid stock data");
  }

  if (item.type === "buy") {
    await prisma.item.update({
      where: {
        id,
      },
      data: {
        buyPrice: item.price,
        quantity: item.quantity,
      },
    });

    await prisma.$disconnect();
  }

  if (item.type === "sell") {
    const dbItem = await prisma.item.findUnique({
      where: {
        id,
      },
    });

    if (!dbItem) {
      throw new Error("Item not found");
    }

    if (dbItem.quantity < item.quantity) {
      throw new Error("Invalid quantity");
    }

    if (dbItem.quantity === item.quantity) {
      await prisma.item.delete({
        where: {
          id,
        },
      });
    } else {
      await prisma.item.update({
        where: {
          id,
        },
        data: {
          quantity: dbItem.quantity - item.quantity,
        },
      });
    }

    await prisma.sell.create({
      data: {
        code: item.code,
        name: item.name,
        quantity: item.quantity,
        reutersCode: item.reutersCode,
        typeCode: item.typeCode,
        typeName: item.typeName,
        url: item.url,
        nationCode: item.nationCode,
        nationName: item.nationName,
        sellPrice: item.price,
        buyPrice: dbItem.buyPrice,
        priceGap: getPriceGep(dbItem.buyPrice, item.price),
        userEmail: email,
      },
    });

    await prisma.$disconnect();
  }

  return {};
}
