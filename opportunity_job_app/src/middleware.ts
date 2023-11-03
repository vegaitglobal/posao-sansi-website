import { isPublicFile } from "@/utils";
import { locales, SERBIAN_LOCALE } from "@/data/locales";
import { NextRequest } from "next/server";
import acceptLanguageParser from "accept-language-parser";

export function middleware(request: NextRequest): Response | undefined {
  if (shouldRedirect(request)) {
    request.nextUrl.pathname = getRedirectResponsePathname(request);
    return Response.redirect(request.nextUrl);
  }
}

function shouldRedirect(request: NextRequest): boolean {
  const { pathname } = request.nextUrl;
  const validPathnameLocale = locales.find(
    locale => pathname.startsWith(`/${ locale }/`) || pathname === `/${ locale }`
  );
  return (
    !validPathnameLocale
    && !isPublicFile(pathname)
    && !pathname.endsWith("favicon.ico")
  );
}

/**
 * Prepends locale to the request's pathname that
 * (as expected by this function) doesn't have locale
 */
function getRedirectResponsePathname(request: NextRequest): string {
  const { pathname } = request.nextUrl;
  const locale = getRedirectResponseLocale(request);
  return `/${ locale }${ pathname }`;
}

function getRedirectResponseLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language");
  const validRequestLocale = acceptLanguageParser.pick(locales, acceptLanguage);
  return validRequestLocale || SERBIAN_LOCALE;
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
