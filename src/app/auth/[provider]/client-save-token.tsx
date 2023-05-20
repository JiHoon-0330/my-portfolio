"use client";

import { clientCookie } from "@/lib/cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
  token: string;
}

export default function ClientSaveToken({ token }: Props) {
  const { replace } = useRouter();

  useEffect(() => {
    if (!window) return;

    clientCookie().set("token", token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
      path: "/",
    });

    replace("/");
  }, [token]);

  return null;
}
