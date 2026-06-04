import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales } from "@/lib/i18n";

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

  if (hasLocale) return NextResponse.next();

  return NextResponse.redirect(new URL("/sr", request.url));
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
