import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // allow next internals, public assets and api calls
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.startsWith("/static") || pathname.match(/\.(.*)$/)) {
    return NextResponse.next();
  }

  // read 'auth' cookie (set by client on successful login)
  const token = request.cookies.get("auth")?.value;

  // if user goes to the login page but is already authenticated -> send to /home
  if (pathname === "/auth/login" && token) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // protected routes - add more prefixes you want protected
  const protectedPrefixes = ["/home", "/dashboard", "/profile"];
  const isProtected = protectedPrefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  if (isProtected && !token) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    // optional: include original path so login page can redirect back
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// apply middleware globally (internal logic checks protected paths)
export const config = {
  matcher: ["/:path*"],
};