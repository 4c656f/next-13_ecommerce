import type {NextRequest} from "next/server";
import {NextFetchEvent, NextResponse} from "next/server";
import {serializeCookie, signToken, validateToken} from "~/utils/tokenMethods";




const protectedForAuthUsers = [
    "/sign_in",
    "/sign_up",
]


export default async function middleware(request: NextRequest, fetch: NextFetchEvent) {


    const validateRefresh = await validateToken(request.cookies.get('refresh_token')?.value)

    const response = NextResponse

    const isRequestForAuthProtected = protectedForAuthUsers.some(value => request.nextUrl.pathname.startsWith(value))

    console.log(isRequestForAuthProtected)
    if(!isRequestForAuthProtected){
        if (validateRefresh) {
            const {refresh} = await signToken({userName: validateRefresh?.userName})
            const refreshToken = serializeCookie('refresh_token', refresh, 60 * 60 * 24 * 30)

            const nextResp = response.next()

            nextResp.headers.set('Set-Cookie', refreshToken)

            return nextResp
        }

        const url = request.nextUrl.clone()
        url.pathname = '/'

        return response.redirect(url)
    }
    if(validateRefresh){
        const url = request.nextUrl.clone()

        url.pathname = '/'

        return response.redirect(url)
    }
    const nextResp = response.next()

    nextResp.headers.set('Set-Cookie', 'refresh_token=""')

    return nextResp


}

export const config = {
    matcher: [
        "/protectedRoute",
        "/sign_in",
        "/sign_up",
    ]

};