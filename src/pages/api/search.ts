import { search } from "@/lib/server-api/naver/search";
import { response } from "@/lib/server-api/response";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const result = await response(() => {
    return search(req);
  });

  res.json(result);
}
