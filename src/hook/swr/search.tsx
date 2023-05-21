import { useDebounce } from "@/hook/debounce";
import { useHTTP } from "@/hook/swr/swr";
import { http } from "@/lib/api/fetch-api";
import { defineProperties } from "@/lib/object";
import { Search } from "@/lib/server-api/naver/search";
import stringify from "fast-json-stable-stringify";

export function useSearch() {
  const { delayedValue, setValue } = useDebounce("", 300);
  const search = delayedValue?.trim();

  const swr = useHTTP<Search>({
    key: search ? ["useSearch", search] : null,
    api: () =>
      http("/api/search", {
        method: "POST",
        body: stringify({ search: delayedValue }),
      }),
  });

  return defineProperties(swr, {
    setSearch: setValue,
  });
}
