import { http } from "@/lib/api/fetch-api";

export function fetchUser() {
  return http("/api/auth");
}
