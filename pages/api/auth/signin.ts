import {NextApiRequest, NextApiResponse} from "next";
import {serializeCookie, signToken} from "~/utils/tokenMethods";


export default async function signIn(req: NextApiRequest, res: NextApiResponse) {



    const {refresh, access} = await signToken({data: 'somePayload'})



    const serializedAccess = serializeCookie('access_token', access, 60 * 60)
    const serializedRefresh = serializeCookie('refresh_token', refresh, 60 * 60 * 24 * 30)

    res.setHeader('Set-Cookie', [serializedAccess, serializedRefresh])


    res.status(200).json({response: true})
}