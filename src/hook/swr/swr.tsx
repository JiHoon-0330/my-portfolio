import { http } from "@/lib/api/fetch-api";
import useSWR from "swr";

export function useHTTP<T extends unknown>({
  key,
  api,
}: {
  key: any[] | null;
  api: () => ReturnType<typeof http<T>>;
}) {
  return useSWR<T>(
    key,
    async () => {
      const result = await api();

      if (!result.success) {
        throw new Error(result.error);
      }

      return result.data;
    },
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
    },
  );
}
