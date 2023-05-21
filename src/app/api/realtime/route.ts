import { realtime } from "@/lib/server-api/naver/realtime";
import { response } from "@/lib/server-api/response";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return await response(async () => {
    return await realtime(req);
  });
}
