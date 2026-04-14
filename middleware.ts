import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path === "/admin/login" || path.startsWith("/admin/login/")) {
    return NextResponse.next();
  }

  if (path === "/api/admin/login" && request.method === "POST") {
    return NextResponse.next();
  }

  if (path.startsWith("/admin") || path.startsWith("/api/admin")) {
    const jwtSecret = process.env.ADMIN_JWT_SECRET;
    if (!jwtSecret || jwtSecret.length < 32) {
      if (path.startsWith("/api/admin")) {
        return NextResponse.json({ error: "Admin auth not configured" }, { status: 503 });
      }
      return new NextResponse("Admin auth not configured (set ADMIN_JWT_SECRET)", { status: 503 });
    }

    const token = request.cookies.get("admin_session")?.value;
    if (!token) {
      if (path.startsWith("/api/admin")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      await jwtVerify(token, new TextEncoder().encode(jwtSecret));
      return NextResponse.next();
    } catch {
      if (path.startsWith("/api/admin")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
