import { addStock } from "@/lib/server-api/portfolio";
import { response } from "@/lib/server-api/response";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return response(async () => {
    const stock = await addStock(req);

    return stock;
  });
}
