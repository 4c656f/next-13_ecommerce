import {NextApiRequest, NextApiResponse} from "next";
import {serializeCookie, signToken} from "~/utils/tokenMethods";


export default async function signIn(req: NextApiRequest, res: NextApiResponse) {



    const {refresh} = await signToken({data: 'somePayload'})



    const serializedRefresh = serializeCookie('refresh_token', refresh, 60 * 60 * 24 * 30)

    res.setHeader('Set-Cookie', serializedRefresh)

    res.status(200).json({response: true})
}