async function getTokenByCookie() {
  if (typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    return cookies().get("token")?.value;
  }
  const { clientCookie } = await import("@/lib/cookie");

  return clientCookie().get("token");
}

export async function http<T extends any>(...params: Parameters<typeof fetch>) {
  const token = await getTokenByCookie();

  const [url, options] = params;

  const baseURL = url?.toString()?.startsWith("http")
    ? ""
    : process.env.NEXT_PUBLIC_BASE_URL;
  const fetchURL = baseURL + url;

  const resp = await fetch(fetchURL, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return resp.json() as Promise<
    | {
        success: true;
        data: T;
      }
    | {
        success: false;
        error?: string;
      }
  >;
}
