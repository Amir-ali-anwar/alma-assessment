import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("authToken")?.value;
  const pathname = request.nextUrl.pathname;

  // Routes that are ALWAYS accessible (public or private)
  const alwaysAllowRoutes = ["/invitation"];

  // Routes only accessible if NOT logged in (public)
const publicRoutes = ["/lead-form", "/signin", "/signup", "/login"];

  // Routes only accessible if logged in (private)
  const privateRoutes = ["/admin", "/dashboard"];

  // Allow always allowed routes no matter what
  if (alwaysAllowRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Handle root `/`
  if (pathname === "/") {
    return token
      ? NextResponse.redirect(new URL("/admin/dashboard", request.url))
      : NextResponse.redirect(new URL("/lead-form", request.url));
  }

  // Redirect unauthenticated users away from private routes
  if (!token && privateRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/lead-form", request.url));
  }

  // Redirect authenticated users away from public routes
  if (token && publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}
