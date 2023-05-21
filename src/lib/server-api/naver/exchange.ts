import { priceToNumber } from "@/lib/price";

// https://m.stock.naver.com/api/home/majors
type HomeMajors = {
  homeMajors: [
    {
      stockType: "domestic";
      stockEndType: "index";
      itemCode: "KOSPI";
      name: "코스피";
      closePrice: "2,537.79";
      compareToPreviousClosePrice: "22.39";
      compareToPreviousPrice: {
        code: "2";
        text: "상승";
        name: "RISING";
      };
      fluctuationsRatio: "0.89";
      marketStatus: "CLOSE";
      isMarketClosed: false;
      localTradedAt: "2023-05-19T18:59:00+09:00";
      imageCharts: {
        mini: "https://ssl.pstatic.net/imgfinance/chart/mobile/mini/KOSPI_home_open.png?1684490340000";
      };
      delayTime: 0;
      delayTimeName: "실시간";
    },
    {
      stockType: "domestic";
      stockEndType: "index";
      itemCode: "KOSDAQ";
      name: "코스닥";
      closePrice: "841.72";
      compareToPreviousClosePrice: "5.83";
      compareToPreviousPrice: {
        code: "2";
        text: "상승";
        name: "RISING";
      };
      fluctuationsRatio: "0.70";
      marketStatus: "CLOSE";
      isMarketClosed: false;
      localTradedAt: "2023-05-19T18:59:00+09:00";
      imageCharts: {
        mini: "https://ssl.pstatic.net/imgfinance/chart/mobile/mini/KOSDAQ_home_open.png?1684490340000";
      };
      delayTime: 0;
      delayTimeName: "실시간";
    },
    {
      stockType: "worldstock";
      stockEndType: "index";
      reutersCode: ".DJI";
      name: "다우존스";
      closePrice: "33,426.63";
      compareToPreviousClosePrice: "-109.28";
      compareToPreviousPrice: {
        code: "5";
        text: "하락";
        name: "FALLING";
      };
      fluctuationsRatio: "-0.33";
      marketStatus: "CLOSE";
      isMarketClosed: false;
      localTradedAt: "2023-05-19T17:02:52-04:00";
      imageCharts: {
        mini: "https://ssl.pstatic.net/imgfinance/chart/mobile/world/mini/.DJI_home_open.png?1684483372000";
      };
      delayTime: 0;
      delayTimeName: "실시간";
      symbolCode: "DJI";
    },
    {
      stockType: "worldstock";
      stockEndType: "index";
      reutersCode: ".IXIC";
      name: "나스닥 종합";
      closePrice: "12,657.90";
      compareToPreviousClosePrice: "-30.94";
      compareToPreviousPrice: {
        code: "5";
        text: "하락";
        name: "FALLING";
      };
      fluctuationsRatio: "-0.24";
      marketStatus: "CLOSE";
      isMarketClosed: false;
      localTradedAt: "2023-05-19T17:15:59-04:00";
      imageCharts: {
        mini: "https://ssl.pstatic.net/imgfinance/chart/mobile/world/mini/.IXIC_home_open.png?1684484159000";
      };
      delayTime: 0;
      delayTimeName: "실시간";
      symbolCode: "IXIC";
    },
    {
      stockType: "worldstock";
      stockEndType: "futures";
      reutersCode: "YMcv1";
      name: "다우 선물";
      closePrice: "33,496.00";
      compareToPreviousClosePrice: "-122.00";
      compareToPreviousPrice: {
        code: "5";
        text: "하락";
        name: "FALLING";
      };
      fluctuationsRatio: "-0.36";
      marketStatus: "CLOSE";
      isMarketClosed: false;
      localTradedAt: "2023-05-19T16:00:00-05:00";
      imageCharts: {
        mini: "https://ssl.pstatic.net/imgfinance/chart/mobile/world/mini/YMcv1_home_open.png?1684479600000";
      };
      delayTime: 10;
      delayTimeName: "10분 지연";
      symbolCode: "YMcv1";
    },
    {
      stockType: "worldstock";
      stockEndType: "futures";
      reutersCode: "NQcv1";
      name: "나스닥 100 선물";
      closePrice: "13,858.00";
      compareToPreviousClosePrice: "-36.00";
      compareToPreviousPrice: {
        code: "5";
        text: "하락";
        name: "FALLING";
      };
      fluctuationsRatio: "-0.26";
      marketStatus: "CLOSE";
      isMarketClosed: false;
      localTradedAt: "2023-05-19T16:00:00-05:00";
      imageCharts: {
        mini: "https://ssl.pstatic.net/imgfinance/chart/mobile/world/mini/NQcv1_home_open.png?1684479600000";
      };
      delayTime: 10;
      delayTimeName: "10분 지연";
      symbolCode: "NQcv1";
    },
    {
      stockType: "worldstock";
      stockEndType: "index";
      reutersCode: ".SSEC";
      name: "상해종합";
      closePrice: "3,283.54";
      compareToPreviousClosePrice: "-13.78";
      compareToPreviousPrice: {
        code: "5";
        text: "하락";
        name: "FALLING";
      };
      fluctuationsRatio: "-0.42";
      marketStatus: "CLOSE";
      isMarketClosed: false;
      localTradedAt: "2023-05-19T15:59:54+08:00";
      imageCharts: {
        mini: "https://ssl.pstatic.net/imgfinance/chart/mobile/world/mini/.SSEC_home_open.png?1684479594000";
      };
      delayTime: 15;
      delayTimeName: "15분 지연";
      symbolCode: "SSEC";
    },
    {
      stockType: "worldstock";
      stockEndType: "index";
      reutersCode: ".N225";
      name: "니케이 225";
      closePrice: "30,808.35";
      compareToPreviousClosePrice: "234.42";
      compareToPreviousPrice: {
        code: "2";
        text: "상승";
        name: "RISING";
      };
      fluctuationsRatio: "0.77";
      marketStatus: "CLOSE";
      isMarketClosed: false;
      localTradedAt: "2023-05-19T15:15:02+09:00";
      imageCharts: {
        mini: "https://ssl.pstatic.net/imgfinance/chart/mobile/world/mini/.N225_home_open.png?1684476902000";
      };
      delayTime: 20;
      delayTimeName: "20분 지연";
      symbolCode: "N225";
    },
  ];
  marketIndexInfos: [
    {
      categoryType: "exchange";
      reutersCode: "FX_USDKRW";
      name: "환율USD";
      closePrice: "1,328.50";
      compareToPreviousClosePrice: "-9.50";
      compareToPreviousPrice: {
        code: "5";
        text: "하락";
        name: "FALLING";
      };
      fluctuationsRatio: "-0.71";
      localTradedAt: "2023-05-19T23:58:05+09:00";
    },
    {
      categoryType: "energy";
      reutersCode: "CLcv1";
      name: "WTI";
      closePrice: "71.55";
      compareToPreviousClosePrice: "-0.31";
      compareToPreviousPrice: {
        code: "5";
        text: "하락";
        name: "FALLING";
      };
      fluctuationsRatio: "-0.43";
      localTradedAt: "2023-05-19T16:00:00+09:00";
    },
    {
      categoryType: "metals";
      reutersCode: "GCcv1";
      name: "국제 금";
      closePrice: "1,981.60";
      compareToPreviousClosePrice: "21.80";
      compareToPreviousPrice: {
        code: "2";
        text: "상승";
        name: "RISING";
      };
      fluctuationsRatio: "1.11";
      localTradedAt: "2023-05-19T16:00:00+09:00";
    },
    {
      categoryType: "metals";
      reutersCode: "HGcv1";
      name: "구리";
      closePrice: "3.7320";
      compareToPreviousClosePrice: "0.0425";
      compareToPreviousPrice: {
        code: "2";
        text: "상승";
        name: "RISING";
      };
      fluctuationsRatio: "1.15";
      localTradedAt: "2023-05-19T16:00:00+09:00";
    },
  ];
};

export async function getExchange() {
  const resp = await fetch("https://m.stock.naver.com/api/home/majors");
  const result: HomeMajors = await resp.json();

  const closePrice = result.marketIndexInfos.find(({ name }) => {
    return name === "환율USD";
  })?.closePrice;

  if (!closePrice) {
    throw new Error("환율USD 정보를 찾을 수 없습니다.");
  }

  return priceToNumber(closePrice);
}
