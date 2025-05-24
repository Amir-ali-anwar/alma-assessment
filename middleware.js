import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("authToken")?.value;
  const pathname = request.nextUrl.pathname;

  const alwaysAllowRoutes = ["/invitation"];
  const publicRoutes = ["/lead-form", "/signin", "/signup", "/login"];

  const privateRoutes = ["/admin", "/dashboard"];

  if (alwaysAllowRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }
  if (pathname === "/") {
    return token
      ? NextResponse.redirect(new URL("/admin/dashboard", request.url))
      : NextResponse.redirect(new URL("/lead-form", request.url));
  }

  if (!token && privateRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/lead-form", request.url));
  }

  if (token && publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}
