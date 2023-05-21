import { Provider } from "@/pages/auth/[provider]";
import CryptoJS from "crypto-js";
import stringify from "fast-json-stable-stringify";

export function encrypt(params: { email: string; provider: Provider }) {
  return CryptoJS.AES.encrypt(
    stringify(params),
    process.env.NEXT_PUBLIC_SHA_KEY,
  ).toString();
}

export function decrypt(token: string) {
  const bytes = CryptoJS.AES.decrypt(token, process.env.NEXT_PUBLIC_SHA_KEY);

  const result = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) as {
    email: string;
    provider: Provider;
  };

  if (!result?.email) {
    throw new Error("Email not found");
  }

  return result;
}
