import { useHTTP } from "@/hook/swr/swr";
import { http } from "@/lib/api/fetch-api";
import { RealtimeInfo } from "@/lib/server-api/naver/realtime";
import { UserInfo } from "@/lib/server-api/user";

export function useRealtime(user: UserInfo) {
  return useHTTP<RealtimeInfo>({
    key: user?.items?.length !== 0 ? ["useRealtime", user?.items] : null,
    api: () => http("/api/realtime"),
  });
}
