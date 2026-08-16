import { NextResponse, type NextRequest } from "next/server";
import { hasLocale, localeCookie, locales, preferredLocale } from "@/lib/i18n";

function persistLocale(response: NextResponse, locale: string) {
  response.cookies.set(localeCookie, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) {
    const locale = pathname.split("/")[1];
    if (hasLocale(locale) && request.cookies.get(localeCookie)?.value !== locale) {
      return persistLocale(NextResponse.next(), locale);
    }
    return;
  }

  const locale = preferredLocale(
    request.headers.get("accept-language"),
    request.cookies.get(localeCookie)?.value,
  );

  request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return persistLocale(NextResponse.redirect(request.nextUrl), locale);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
};
