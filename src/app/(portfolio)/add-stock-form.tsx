"use client";

import { useSearch } from "@/hook/swr/search";
import { action } from "@/lib/form/action";
import { SearchResultItem } from "@/lib/server-api/naver/search";
import { InputItem } from "@/lib/server-api/portfolio";
import stringify from "fast-json-stable-stringify";
import { Button, Modal, TextInput } from "flowbite-react";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

interface Item extends Omit<InputItem, "buyPrice" | "quantity"> {
  buyPrice: string;
  quantity: string;
}

interface Props {
  revalidateAfterAction: () => Promise<void>;
}

export default function AddItemForm({ revalidateAfterAction }: Props) {
  const { data, setSearch } = useSearch();

  const [show, setShow] = useState(false);
  const [buyPrice, setBuyPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const root = useRef<HTMLDivElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const item = useRef<Item>({
    code: "",
    name: "",
    typeCode: "",
    typeName: "",
    url: "",
    reutersCode: "",
    nationCode: "",
    nationName: "",
    buyPrice: "",
    quantity: "",
  });
  item.current.buyPrice = buyPrice;
  item.current.quantity = quantity;
  const checkUpdate = useRef(false);

  useEffect(() => {
    const next = data?.result?.items?.at(0);

    if (next) {
      if (data?.result?.query === item.current.name) return;

      updateItem(next);
    } else {
      updateItem({
        code: "",
        name: "",
        typeCode: "",
        typeName: "",
        url: "",
        reutersCode: "",
        nationCode: "",
        nationName: "",
      });
    }
  }, [data]);

  function clear() {
    setBuyPrice("");
    setQuantity("");
  }

  function updateItem(value: Partial<Item>) {
    item.current = {
      ...item.current,
      ...value,
    };
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target as typeof e.target & {
      name: "name" | "buyPrice" | "quantity";
    };

    const mapSetState: Record<typeof name, Dispatch<SetStateAction<string>>> = {
      name: setSearch,
      buyPrice: setBuyPrice,
      quantity: setQuantity,
    };

    mapSetState[name](value);
  }

  function onClickSearchItem(inputItem: SearchResultItem) {
    item.current = {
      ...item.current,
      ...inputItem,
    };
  }

  return (
    <div ref={root} className="mt-auto">
      <Modal
        root={root?.current ?? undefined}
        show={show}
        onClose={() => {
          clear();
          setShow(false);

          if (checkUpdate.current) {
            revalidateAfterAction();
            checkUpdate.current = false;
          }
        }}
      >
        <Modal.Header>종목 검색</Modal.Header>
        <Modal.Body>
          <form
            ref={form}
            className="flex-1 flex flex-col gap-4"
            action={async () => {
              const result = await action(
                "/api/portfolio/item",
                stringify(item.current),
                form,
              );
              if (result.success) {
                clear();
                checkUpdate.current = true;
              }
            }}
          >
            <div>
              종목:{" "}
              <TextInput
                list={"search"}
                inputMode="text"
                name={"name"}
                onChange={onChange}
                required
                autoComplete="off"
              />
              <datalist id="search">
                {data?.result?.items?.map((item) => {
                  const { code, name, typeName } = item;
                  return (
                    <option
                      key={code}
                      value={name}
                      onClick={() => onClickSearchItem(item)}
                    >
                      {code} {typeName}
                    </option>
                  );
                })}
              </datalist>
            </div>
            <div>
              매수가 (미국: 달러, 한국: 원, 코인: 원):{" "}
              <TextInput
                value={buyPrice}
                inputMode="decimal"
                name={"buyPrice"}
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
      <Button className="ml-auto" onClick={() => setShow(true)}>
        종목 검색
      </Button>
    </div>
  );
}
