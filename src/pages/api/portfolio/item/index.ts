import { addStock } from "@/lib/server-api/portfolio";
import { response } from "@/lib/server-api/response";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const result = await response(() => {
    return addStock(req);
  });

  res.json(result);
}
