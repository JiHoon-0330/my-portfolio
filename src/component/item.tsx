"use client";

import { openBuyAndSellForm } from "@/component/buy-and-sell-form";
import { percentFormat, priceFormat, quantityFormat } from "@/lib/price";
import { Realtime } from "@/lib/server-api/naver/realtime";
import { Item } from "@prisma/client";
import { Button, ListGroup } from "flowbite-react";

interface Props {
  item: Item;
  realtime?: Realtime;
}

export default function Item({ item, realtime }: Props) {
  function buy() {
    openBuyAndSellForm("buy", item);
  }

  function sell() {
    openBuyAndSellForm("sell", item);
  }

  return (
    <div>
      <ListGroup className="flex  items-center py-2 px-4 mb-5">
        <div className="flex-1">
          <div>
            <span>{item.name}</span>{" "}
            <span>{item.typeName?.split(" ")?.at(0)}</span>
          </div>

          <div>
            <div>
              평균가격:{" "}
              <span>{priceFormat(item.buyPrice, item.nationName)}</span>
            </div>
            <div>
              수량: <span>{quantityFormat(item.quantity)}</span>
            </div>
            <div>
              수익률: <span>{percentFormat(realtime?.percent)}</span>
            </div>
          </div>
        </div>
        <Button onClick={buy}>매수</Button>
        <Button onClick={sell}>매도</Button>
      </ListGroup>
    </div>
  );
}
