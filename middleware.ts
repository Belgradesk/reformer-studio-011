import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getLocaleFromPathname, locales } from "@/lib/i18n";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (hasLocale) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-lang", getLocaleFromPathname(pathname));
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  return NextResponse.redirect(new URL("/sr", request.url));
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
