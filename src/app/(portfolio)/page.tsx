import AddDividends from "@/app/(portfolio)/add-dividends";
import AddItemForm from "@/app/(portfolio)/add-stock-form";
import BuyAndSellForm from "@/app/(portfolio)/buy-and-sell-form";
import Items from "@/app/(portfolio)/items";
import Total from "@/app/(portfolio)/total";
import User from "@/app/(portfolio)/user";
import { fetchUser } from "@/lib/api/user";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const result = await fetchUser();

  async function revalidate() {
    "use server";

    revalidatePath("/");
  }

  if (!result.success) {
    return null;
  }

  return (
    <>
      <User user={result.data} />
      <div className="flex justify-between items-end">
        <Total user={result.data} />
        <div>
          <AddItemForm revalidateAfterAction={revalidate} />
          <AddDividends revalidateAfterAction={revalidate} />
        </div>
      </div>
      <Items user={result.data} />
      <BuyAndSellForm revalidateAfterAction={revalidate} />
    </>
  );
}
