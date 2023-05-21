import { dividends } from "@/lib/server-api/dividends";
import { response } from "@/lib/server-api/response";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const result = await response(() => {
    return dividends(req);
  });

  res.json(result);
}
