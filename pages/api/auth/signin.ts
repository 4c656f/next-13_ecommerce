import {NextApiRequest, NextApiResponse} from "next";

let jwt = require('jsonwebtoken');
let cookie = require('cookie');


export default async function signIn(req: NextApiRequest, res: NextApiResponse) {



    const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
        username: 'SomeUsername'
    }, 'someSecret')



    const serializedCookie = cookie.serialize('refresh', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 25 * 30,
        path: '/'
    })

    res.setHeader('Set-Cookie', serializedCookie)
    res.status(200).json({response: true})
}