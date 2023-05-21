import { updateStock } from "@/lib/server-api/portfolio";
import { response } from "@/lib/server-api/response";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return await response(async () => {
    return await updateStock(req);
  });
}
