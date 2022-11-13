import {NextApiRequest, NextApiResponse} from "next";
import {serializeCookie, signToken} from "~/utils/tokenMethods";
import {prisma} from "~/utils/prisma";
import slugify from "slugify";
import {json} from "stream/consumers";


export default async function signUp(req: NextApiRequest, res: NextApiResponse) {

    const reqBody = JSON.parse(req.body)

    const {
        userName,
        email,
        password,
    } = reqBody




    const link = slugify(userName)

    const isUniq = await prisma.user.findFirst({
        where: {
            OR:[
                {username: userName},
                {email: email}
            ]
        }
    })


    if(isUniq){
        return res.status(400).json('user is not uniq')
    }




    const {refresh} = await signToken({
        userName: userName
    })

    const createdUser = await prisma.user.create({
        data: {
            email: email,
            userLink: link,
            username: userName,
            password: password,
            refreshToken: refresh
        }
    })
    const serializedRefresh = serializeCookie('refresh_token', refresh, 60 * 60 * 24 * 30)

    res.setHeader('Set-Cookie', serializedRefresh)

    res.status(200).json({response: true})
}