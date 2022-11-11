import cookie from "cookie";

import {SignJWT, jwtVerify} from 'jose'
import {JWTPayload} from 'jose/dist/types'


export const validateToken = async (token:string|undefined,type:'access'|'refresh') => {

    if(!token)return false

    if(type==='refresh'){
        try{
            const {payload} = await jwtVerify(token, new TextEncoder().encode(process.env["REFRESH_SECRET"]));

            return payload
        }catch (e) {
            return false
        }

    }
    try {
        const {payload} = await jwtVerify(token, new TextEncoder().encode(process.env["ACCESS_SECRET"]));

        return payload
    }catch (e) {
        return false
    }

}
export const signToken = async (payload: JWTPayload):Promise<{access: string, refresh:string}> => {

    const iat = Math.floor(Date.now() / 1000);

    const access = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .setExpirationTime('2h')
        .sign(new TextEncoder().encode(process.env["ACCESS_SECRET"]))


    const refresh = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .setExpirationTime('30d')
        .sign(new TextEncoder().encode(process.env["REFRESH_SECRET"]))

    return {access, refresh}
}
export const serializeCookie = (key:string,data:string, maxAge:number) => {
    return cookie.serialize(key, data, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: maxAge,
        path: '/'
    })
}