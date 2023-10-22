import { isPublicFile } from "@/utils";

const locales = ["en", "sr"];

function getLocale(request): string {
    return "en"; // TODO: get from request
}

export function middleware(request): Response | undefined {
    const { pathname } = request.nextUrl;
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${ locale }/`) || pathname === `/${ locale }`
    );

    const shouldRedirect = !pathnameHasLocale && !isPublicFile(pathname);
    if (shouldRedirect) {
        const locale = getLocale(request);
        request.nextUrl.pathname = `/${ locale }${ pathname }`;
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
