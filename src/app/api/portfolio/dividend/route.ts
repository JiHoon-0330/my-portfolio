import { dividends } from "@/lib/server-api/dividends";
import { response } from "@/lib/server-api/response";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return await response(async () => {
    return await dividends(req);
  });
}
