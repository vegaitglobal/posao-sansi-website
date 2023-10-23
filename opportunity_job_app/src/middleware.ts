import { isPublicFile } from "@/utils";
import { locales, SERBIAN_LOCALE } from "@/appData/locales";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest): Response | undefined {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${ locale }/`) || pathname === `/${ locale }`
  );

  const shouldRedirect = !pathnameHasLocale && !isPublicFile(pathname);
  if (shouldRedirect) {
    request.nextUrl.pathname = `/${ SERBIAN_LOCALE }${ pathname }`;
    return Response.redirect(request.nextUrl);
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
