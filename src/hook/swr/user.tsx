import { useHTTP } from "@/hook/swr/swr";
import { fetchUser } from "@/lib/api/user";
import { UserInfo } from "@/lib/server-api/user";

export function useUserInfo() {
  return useHTTP<UserInfo>({
    key: ["useUserInfo"],
    api: () => fetchUser(),
  });
}
