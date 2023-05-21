"use client";

import { useRealtime } from "@/hook/swr/realtime";
import { priceFormat } from "@/lib/price";
import { UserInfo } from "@/lib/server-api/user";

interface Props {
  user: UserInfo;
}

export default function Total({ user }: Props) {
  const { data } = useRealtime(user);

  const realtimeAmount = data?.realtimeTotalAmount ?? 0;

  const hasAmountGap = realtimeAmount - user.hasAmount;
  const returnPrice = hasAmountGap + user.sellAmount + user.dividendsAmount;

  return (
    <div>
      <div>
        보유 자산:{" "}
        {priceFormat(data?.realtimeTotalAmount ?? 0 + user.sellAmount)}
      </div>
      <div>현재까지 수익: {priceFormat(returnPrice)}</div>
      <div>보유 자산 수익: {priceFormat(hasAmountGap)}</div>
      <div>판매 수익: {priceFormat(user.sellAmount)}</div>
      <div>배당 수익: {priceFormat(user.dividendsAmount)}</div>
    </div>
  );
}
