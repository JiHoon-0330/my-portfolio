"use client";

import { UserInfo } from "@/lib/server-api/user";

interface Props {
  user: UserInfo;
}

export default function User({ user }: Props) {
  return <div>{user.email}님의 포트폴리오</div>;
}
