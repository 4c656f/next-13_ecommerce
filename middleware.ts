import {NextFetchEvent, NextResponse} from "next/server";
import type { NextRequest } from "next/server";
import {serializeCookie, signToken, validateToken} from "~/utils/tokenMethods";

export default async function middleware(request: NextRequest, fetch:NextFetchEvent) {


    const validateAccess = await validateToken(request.cookies.get('access_token')?.value, 'access')
    const validateRefresh = await validateToken(request.cookies.get('refresh_token')?.value, 'refresh')

    console.log(validateRefresh,validateAccess)

    if(validateAccess){
        return;
    }
    if(validateRefresh){
        const {access, refresh} = await signToken({someKey: 'string'})

        const accessToken = serializeCookie('access_token', access, 60*60)

        const refreshToken = serializeCookie('refresh_token', refresh, 60 * 60 * 24 * 30)


        const resp = NextResponse.next()

        resp.headers.set('Set-Cookie', `${accessToken}; ${refreshToken}`)
        return resp
    }


    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
}

export const config = {
    matcher: "/protectedRoute",
};