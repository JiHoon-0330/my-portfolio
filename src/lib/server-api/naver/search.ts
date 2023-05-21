import { NextApiRequest } from "next";

export type SearchResultItem = {
  /**
   * 종목코드
   * "005930"
   */
  code: string;
  /**
   * 종목이름
   * "삼성전자"
   */
  name: string;
  /**
   * 시장
   * "KOSPI" | "KOSDAQ" | "NASDAQ" | "NYSE" | "AMEX"
   */
  typeCode: string;
  /**
   * 시장
   * "코스피"
   */
  typeName: string;
  url: string;
  /**
   * "005930"
   */
  reutersCode: string;
  /**
   * KOR
   */
  nationCode: string;
  /**
   * "대한민국"
   */
  nationName: string;
};

export type Search = {
  isSuccess: boolean;
  detailCode: string;
  message: string;
  result: {
    /**
     * 검색어 입력값
     */
    query: string;
    items: SearchResultItem[];
  };
};

export async function search(req: NextApiRequest) {
  const { search } = JSON.parse(req.body);

  const resp = await fetch(
    `https://m.stock.naver.com/front-api/v1/search/autoComplete?query=${encodeURIComponent(
      search,
    )}&target=${encodeURIComponent("stock,index,coin,")}`,
  );

  const result: Search = await resp.json();

  if (!result.isSuccess) {
    throw new Error(result.message);
  }

  return result;
}
