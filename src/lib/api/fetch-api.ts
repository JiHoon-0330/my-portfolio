import { cookies } from "next/headers";

export async function http(...params: Parameters<typeof fetch>) {
  const token = cookies().get("token")?.value;

  const [url, options] = params;

  const resp = await fetch(`http://localhost:3000${url}`, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return resp.json();
}
