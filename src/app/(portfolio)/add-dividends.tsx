"use client";

import { action } from "@/lib/form/action";
import stringify from "fast-json-stable-stringify";
import { Button, Modal, TextInput } from "flowbite-react";
import { useRef, useState } from "react";

interface Props {
  revalidateAfterAction: () => Promise<void>;
}

export default function AddDividends({ revalidateAfterAction }: Props) {
  const [show, setShow] = useState(false);
  const [price, setPrice] = useState("");

  const root = useRef<HTMLDivElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const checkUpdate = useRef(false);

  function clear() {
    setPrice("");
  }

  return (
    <div ref={root}>
      <Modal
        root={root.current ?? undefined}
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
        <Modal.Header>배당금 추가</Modal.Header>
        <Modal.Body>
          <form
            ref={form}
            className="flex-1 flex flex-col gap-4"
            action={async () => {
              const result = await action(
                "/api/portfolio/dividend",
                stringify({ price }),
                form,
              );

              if (result.success) {
                clear();
                checkUpdate.current = true;
              }
            }}
          >
            <div>
              배당금 (원):{" "}
              <TextInput
                inputMode="decimal"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <Button type="submit">저장</Button>
          </form>
        </Modal.Body>
      </Modal>
      <Button className="ml-auto" onClick={() => setShow(true)}>
        배당금 추가
      </Button>
    </div>
  );
}
