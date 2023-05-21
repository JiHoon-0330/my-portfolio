import { realtime } from "@/lib/server-api/naver/realtime";
import { response } from "@/lib/server-api/response";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const result = await response(() => {
    return realtime(req);
  });

  res.json(result);
}
