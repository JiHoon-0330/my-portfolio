"use client";
import { User } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
  user: User | null;
}

export default function ClientRedirectAuth({ user }: Props) {
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    if (pathname.startsWith("/auth") || user) return;

    replace("/auth");
  }, [user, pathname]);

  return null;
}
