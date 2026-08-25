import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-portfolio-locale", request.nextUrl.pathname === "/zh" || request.nextUrl.pathname.startsWith("/zh/") ? "zh-CN" : "en");
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|manifest.json|robots.txt|sitemap.xml|assets|brand).*)"],
};
