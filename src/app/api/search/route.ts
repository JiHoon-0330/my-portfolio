import { search } from "@/lib/server-api/naver/search";
import { response } from "@/lib/server-api/response";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return await response(async () => {
    return search(req);
  });
}
