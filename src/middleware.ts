// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const authToken = req.cookies.get("authToken")?.value;

  // If user visits /login and already has a token, redirect to /dashboard
  if (pathname === "/login" && authToken) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // If user visits any /dashboard route and does NOT have a token, redirect to /login
  if (pathname.startsWith("/dashboard") && !authToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Only run the middleware on the specified paths:
export const config = {
  matcher: ["/login", "/dashboard/:path*"],
};
