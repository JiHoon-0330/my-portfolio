import { response } from "@/lib/server-api/response";
import { getUserInfo } from "@/lib/server-api/user";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return await response(() => {
    return getUserInfo(req);
  });
}
