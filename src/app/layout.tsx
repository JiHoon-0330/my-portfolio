import ClientRedirectAuth from "@/app/client-redirect-auth";
import { fetchUser } from "@/lib/api/user";
import { Inter } from "next/font/google";
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
  const user = await fetchUser();

  return (
    <html lang="ko">
      <script src="https://accounts.google.com/gsi/client" async defer />
      <body className={inter.className}>{children}</body>
      <ClientRedirectAuth user={user} />
    </html>
  );
}
