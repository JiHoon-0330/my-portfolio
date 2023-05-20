import { fetchUser } from "@/lib/api/user";
import Link from "next/link";

export default async function Home() {
  const data = await fetchUser();

  return (
    <div className="">
      {JSON.stringify(data ?? {}, null, 2)}
      {data ? null : <Link href={"/auth"}>로그인</Link>}
    </div>
  );
}
