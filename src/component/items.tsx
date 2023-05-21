import { useRealtime } from "@/hook/swr/realtime";
import { UserInfo } from "@/lib/server-api/user";
import Item from "./item";

interface Props {
  user: UserInfo;
}

export default function Items({ user }: Props) {
  const { data } = useRealtime(user);

  return (
    <div className="flex flex-col my-10">
      {user?.items?.map((item, index) => {
        return (
          <Item key={item.id} item={item} realtime={data?.datas?.at(index)} />
        );
      })}
    </div>
  );
}
