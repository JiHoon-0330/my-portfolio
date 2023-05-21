import { response } from "@/lib/server-api/response";
import { getUserInfo } from "@/lib/server-api/user";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const result = await response(() => {
    return getUserInfo(req);
  });

  res.json(result);
}
