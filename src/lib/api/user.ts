import { http } from "@/lib/api/fetch-api";
import { UserInfo } from "@/lib/server-api/user";

export function fetchUser() {
  return http<UserInfo>("/api/auth");
}
