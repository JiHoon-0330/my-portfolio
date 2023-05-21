import ToastContainer from "@/app/toast-container";
import { Inter } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "포트폴리오",
  description: "내 자산 관리",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="bg-slate-100">
      <script src="https://accounts.google.com/gsi/client" async defer />
      <body
        className={`${inter.className} w-[800px] min-h-screen m-auto bg-white flex flex-col px-[30px] py-[50px]`}
      >
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
