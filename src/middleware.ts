// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get("accessToken")?.value;

    if (request.nextUrl.pathname.startsWith("/dashboard")) {
        if (!accessToken) {
            return NextResponse.redirect(new URL("/signin", request.url));
        }

        try {
            // decode token
            const decoded: any = jwt.decode(accessToken);

            if (!decoded || decoded.exp * 1000 < Date.now()) {
                // token expired → logout
                const response = NextResponse.redirect(new URL("/signin", request.url));
                response.cookies.delete("accessToken");
                response.cookies.delete("refreshToken");
                return response;
            }
        } catch (err) {
            return NextResponse.redirect(new URL("/signin", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"],
};
