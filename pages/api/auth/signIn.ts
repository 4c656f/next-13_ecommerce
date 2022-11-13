import {NextApiRequest, NextApiResponse} from "next";
import {serializeCookie, signToken} from "~/utils/tokenMethods";
import {prisma} from "~/utils/prisma";
import slugify from "slugify";
import {json} from "stream/consumers";


export default async function signUp(req: NextApiRequest, res: NextApiResponse) {

    const reqBody = JSON.parse(req.body)

    const {
        userName,
        password,
    } = reqBody






    const isUniq = await prisma.user.findUnique({
        where: {
            username: userName
        }
    })


    if(!isUniq){
        return res.status(401).json('user is not uniq')
    }
    if(isUniq.password !== password){
        return res.status(401).json('user is not uniq')
    }

    const {refresh} = await signToken({
        userName: userName
    })


    const serializedRefresh = serializeCookie('refresh_token', refresh, 60 * 60 * 24 * 30)

    res.setHeader('Set-Cookie', serializedRefresh)

    res.status(200).json({userName: userName})
}