import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  const token = req.cookies.get("token")?.value;

  if (!token && !url.pathname.startsWith("/auth")) {
    return NextResponse.redirect("/auth");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
