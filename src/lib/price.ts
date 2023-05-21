export function getPriceGep(prev: number, current: number) {
  return current - prev;
}

export function getPercent(prev: number, current: number) {
  const gap = getPriceGep(prev, current);
  return (gap / prev) * 100;
}

export function priceToNumber(price: string): number {
  const formatted = +price?.replace(/\,/g, "");

  if (Number.isNaN(formatted)) {
    throw new Error("Invalid price, priceToNumber");
  }

  return formatted;
}

export function quantityFormat(quantity: number) {
  const formatted = new Intl.NumberFormat("ko", {
    notation: "compact",
  }).format(quantity);

  return `${formatted ?? "-"}주`;
}

function priceFormatKRW(price: number) {
  return new Intl.NumberFormat("ko", {
    style: "currency",
    currency: "KRW",
  }).format(price);
}

function priceFormatUSD(price: number) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export function priceFormat(price: number, nationName?: string | null) {
  const formatter: Record<string, (price: number) => string> = {
    미국: priceFormatUSD,
    대한민국: priceFormatKRW,
  };

  if (!nationName) return priceFormatKRW(price);

  return formatter?.[nationName]?.(price);
}

export function percentFormat(percent?: number) {
  if (!percent) return "-";

  return new Intl.NumberFormat("ko", {
    style: "percent",
    signDisplay: "always",
    maximumFractionDigits: 2,
  }).format(percent / 100);
}
