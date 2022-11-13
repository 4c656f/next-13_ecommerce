import {z} from "zod";
import {publicProcedure, router} from "../trpcServer";
import {TRPCError} from "@trpc/server";
import {prisma} from "~/utils/prisma";
import {serializeCookie, signToken} from "~/utils/tokenMethods";
import {headers} from "next/headers";
import slugify from "slugify";

export const userRouter = router({
    signIn: publicProcedure
        .input(z.object({
            userName: z.string(),
            password: z.string(),
        }))
        .query(async ({input, ctx}) => {
            const {
                userName,
                password
            }= input

            const isUniq = await prisma.user.findUnique({
                where: {
                    username: userName
                }
            })


            if(!isUniq){
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'User not found',
                })
            }
            if(isUniq.password !== password){
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'Invalid password',
                })
            }

            const {refresh} = await signToken({
                userName: userName
            })

            const serializedRefresh = serializeCookie('refresh_token', refresh, 60 * 60 * 24 * 30)

            ctx.res.setHeader('Set-Cookie', serializedRefresh)

            return {userName: userName}

        }),
    signUp: publicProcedure
        .input(z.object({
            userName: z.string(),
            email: z.string(),
            password: z.string(),
        }))
        .query(async ({input, ctx}) => {
            const {
                userName,
                password,
                email
            }= input



            const isUniq = await prisma.user.findFirst({
                where: {
                    OR:[
                        {username: userName},
                        {email: email}
                    ]
                }
            })


            if(isUniq){
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'User not uniq',
                })
            }
            const link = slugify(userName)



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

            ctx.res.setHeader('Set-Cookie', serializedRefresh)

            return {userName: userName}
        }),
});