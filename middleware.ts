import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
    console.log('request', request.url)




    return
}

export const config = {
    matcher: "/protectedRoute",
};