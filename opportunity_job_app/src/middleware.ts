import { locales, SERBIAN_LOCALE } from "@/data/locales";
import { NextRequest, NextResponse } from "next/server";
import acceptLanguageParser from "accept-language-parser";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";


export function middleware(request: NextRequest): NextResponse | undefined {
  const { pathname } = request.nextUrl;
  if (isLanguageAgnosticPathname(pathname)) {
    return;
  }

  const pathnameLocale = getPathnameLocale(pathname);
  const requestLocale = getRequestLocale(request);
  if (pathnameLocale && pathnameLocale === requestLocale) {
    return;
  }

  const preferredLocale = pathnameLocale || requestLocale || SERBIAN_LOCALE;
  if (!pathnameLocale) {
    request.nextUrl.pathname = `/${ preferredLocale }${ request.nextUrl.pathname }`;
  }
  const response = NextResponse.redirect(request.nextUrl);

  setPreferredLanguageCookie(response, preferredLocale);
  return response;
}

function isLanguageAgnosticPathname(pathname: string): boolean {
  if (isRootPublicFile(pathname)) {
    return true;
  }

  return hasLanguageAgnosticParentPath(pathname);
}

function isRootPublicFile(pathname: string): boolean {
  const isOnePartPathname = !pathname.slice(1).includes("/");
  if (!isOnePartPathname) {
    return false;
  }

  const rootPublicFilenames = [
    "favicon.ico",
  ];
  return !!rootPublicFilenames.find(filename => {
    return pathname === `/${ filename }`;
  });
}

function hasLanguageAgnosticParentPath(pathname: string): boolean {
  const languageAgnosticParentPaths: string[] = [
    "/files",
    "/fonts",
    "/images",
  ];
  return !!languageAgnosticParentPaths.find(parentPath => {
    return pathname.startsWith(`${ parentPath }/`);
  });
}

function getRequestLocale(request: NextRequest): string | null {
  const preferredLanguageCookie = request.cookies.get("Preferred-Language");
  let locale;
  if (preferredLanguageCookie) {
    locale = acceptLanguageParser.pick(locales, preferredLanguageCookie.value);
  }
  if (!locale) {
    const acceptLanguage = request.headers.get("accept-language") || "";
    locale = acceptLanguageParser.pick(locales, acceptLanguage);
  }
  return locale;
}

function getPathnameLocale(pathname: string): string | undefined {
  return locales.find(
      locale => pathname.startsWith(`/${ locale }/`) || pathname === `/${ locale }`,
  );
}

function setPreferredLanguageCookie(response: NextResponse, locale: string): void {
  const cookieOptions: Partial<ResponseCookie> = {
    httpOnly: true,
    sameSite: "strict",
  };
  response.cookies.set("Preferred-Language", locale, cookieOptions);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
