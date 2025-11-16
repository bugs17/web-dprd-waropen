import { NextResponse } from "next/server";

export function middleware(req) {
  const session = req.cookies.get("session")?.value;
  const path = req.nextUrl.pathname;

  const isDashboard = path.startsWith("/dashboard");
  const isLogin = path.startsWith("/login");

  // Belum login → tidak boleh akses dashboard
  if (isDashboard && !session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Sudah login → tidak boleh akses login
  if (isLogin && session) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
