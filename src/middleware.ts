import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'



export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const searchParams = request.nextUrl.search;

    // Check if the request is for a static file (e.g., images, CSS, JS, etc.)
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/favicon.ico') ||
        pathname.match(/\.(jpg|jpeg|png|gif|svg|ico|css|js|json|txt|xml)$/)
    ) {
        return NextResponse.next();
    }

}

export const config = {
    // Matcher ignoring `/_next/` and `/api/`
    matcher: ['/((?!api|public|assets|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
}