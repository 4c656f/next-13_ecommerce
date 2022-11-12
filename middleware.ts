import {NextFetchEvent, NextResponse} from "next/server";
import type { NextRequest } from "next/server";
import {serializeCookie, signToken, validateToken} from "~/utils/tokenMethods";

export default async function middleware(request: NextRequest, fetch:NextFetchEvent) {


    const validateRefresh = await validateToken(request.cookies.get('refresh_token')?.value)

    const response = NextResponse

    if(validateRefresh){
        const {refresh} = await signToken({someKey: 'string'})


        const refreshToken = serializeCookie('refresh_token', refresh, 60 * 60 * 24 * 30)

        const nextResp = response.next()
        nextResp.headers.set('Set-Cookie', refreshToken)
        return nextResp
    }

    const url = request.nextUrl.clone()
    url.pathname = '/'
    return response.redirect(url).cookies.delete('refresh_token')
}

export const config = {
    matcher: "/protectedRoute",
};