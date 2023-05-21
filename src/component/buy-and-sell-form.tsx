"use client";

import { action } from "@/lib/form/action";
import { priceToNumber, quantityFormat } from "@/lib/price";
import { Item } from "@prisma/client";
import stringify from "fast-json-stable-stringify";
import { Button, Modal, TextInput } from "flowbite-react";
import throttle from "lodash.throttle";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";

const toastWarn = throttle(() => {
  toast.warn("보유 수량보다 많이 입력할 수 없습니다.");
}, 5000);

export function openBuyAndSellForm(type: "buy" | "sell", item: Item) {
  const eventName = `open-${type}`;
  document.dispatchEvent(
    new CustomEvent(eventName, {
      detail: item,
    }),
  );
}

interface Props {
  revalidateAfterAction: () => Promise<void>;
}

export default function BuyAndSellForm({ revalidateAfterAction }: Props) {
  const [formType, setFormType] = useState<"buy" | "sell" | null>(null);
  const [item, setItem] = useState<Item | null>(null);
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const root = useRef<HTMLDivElement>(null);
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    function openBuy(e: CustomEvent<Item>) {
      setFormType("buy");
      setItem(e.detail);
    }

    function openSell(e: CustomEvent<Item>) {
      setFormType("sell");
      setItem(e.detail);
      setQuantity(quantityFormat(e.detail.quantity)?.replace("주", ""));
    }

    document.addEventListener("open-buy", openBuy as any);
    document.addEventListener("open-sell", openSell as any);

    return () => {
      document.removeEventListener("open-buy", openBuy as any);
      document.removeEventListener("open-sell", openSell as any);
    };
  }, []);

  function clear() {
    setFormType(null);
    setItem(null);
    setPrice("");
    setQuantity("");
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target as typeof e.target & {
      name: "price" | "quantity";
    };

    if (
      formType === "sell" &&
      name === "quantity" &&
      item?.quantity! < priceToNumber(value)
    ) {
      toastWarn();
      return;
    }

    const mapSetState: Record<typeof name, Dispatch<SetStateAction<string>>> = {
      price: setPrice,
      quantity: setQuantity,
    };

    mapSetState[name](value);
  }

  const displayType =
    formType === "buy" ? "매수" : formType === "sell" ? "매도" : "";

  return (
    <div ref={root}>
      <Modal
        root={root.current ?? undefined}
        show={formType != null}
        onClose={clear}
      >
        <Modal.Header>
          {item?.name} {displayType}
        </Modal.Header>

        <Modal.Body>
          <form
            ref={form}
            className="flex-1 flex flex-col gap-4"
            onSubmit={async (e) => {
              e.preventDefault();
              if (!item?.id) return;

              const result = await action(
                `/api/portfolio/item/${item.id}`,
                stringify({
                  ...item,
                  price,
                  quantity,
                  type: formType,
                }),
                form,
              );
              if (result.success) {
                revalidateAfterAction();
                clear();
              }
            }}
          >
            <div>
              {displayType}가:{" "}
              <TextInput
                value={price}
                inputMode="decimal"
                name={"price"}
                onChange={onChange}
                required
                autoComplete="off"
              />
            </div>
            <div>
              수량:{" "}
              <TextInput
                value={quantity}
                inputMode="decimal"
                name={"quantity"}
                onChange={onChange}
                required
                autoComplete="off"
              />
            </div>
            <Button type="submit">저장</Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
