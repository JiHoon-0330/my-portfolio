import { http } from "@/lib/api/fetch-api";
import { RefObject } from "react";
import { toast } from "react-toastify";

export async function action(
  url: string,
  body: string,
  form?: RefObject<HTMLFormElement>,
) {
  const result = await http(url, {
    method: "POST",
    body,
  });

  if (result.success) {
    form?.current?.reset();
    toast.success("저장되었습니다.");
  } else {
    if ("error" in result) {
      toast.error(result.error as string);
    } else {
      toast.error("알 수 없는 오류가 발생했습니다.");
    }
  }

  return result;
}
