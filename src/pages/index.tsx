import AddDividends from "@/component/add-dividends";
import AddItemForm from "@/component/add-stock-form";
import BuyAndSellForm from "@/component/buy-and-sell-form";
import Items from "@/component/items";
import Total from "@/component/total";
import User from "@/component/user";
import { useUserInfo } from "@/hook/swr/user";

export default function HomePage() {
  const { data, error, isLoading, mutate } = useUserInfo();

  async function revalidate() {
    mutate();
  }

  if (error) {
    return null;
  }

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <User user={data} />
      <div className="flex justify-between items-end my-6">
        <Total user={data} />
        <div>
          <AddItemForm revalidateAfterAction={revalidate} />
          <AddDividends revalidateAfterAction={revalidate} />
        </div>
      </div>
      <Items user={data} />
      <BuyAndSellForm revalidateAfterAction={revalidate} />
    </>
  );
}
