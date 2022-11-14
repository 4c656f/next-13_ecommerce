import {z} from "zod";
import {publicProcedure, router} from "../trpcServer";
import {TRPCError} from "@trpc/server";
import {prisma} from "~/utils/prisma";
import {serializeCookie, signToken, validateToken} from "~/utils/tokenMethods";
import {headers} from "next/headers";
import slugify from "slugify";
import {CartItem} from '@prisma/client'
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
    addToCart: publicProcedure.input(z.object({
        productId: z.string()
    })).mutation(async ({input, ctx})=>{

        const {
            productId
        } = input

        const {
            refreshToken
        } = ctx

        const payload = await validateToken(refreshToken)

        if (!refreshToken || !payload) {
            throw new TRPCError({
                code: 'UNAUTHORIZED',
                message: 'un'
            })
        }
        const cartId = await prisma.userCart.findFirst({
            where:{
                user:{
                    username: payload.userName as string
                }
            },
            select:{
                id: true
            }
        })


        console.log(payload.userName, cartId, 'payload-----')

        const addProduct = await prisma.user.update({
            where:{
                username: payload.userName as string
            },
            data:{
                cart:{
                    upsert:{
                        update: {
                            cartItems:{
                                upsert:{
                                    where:{
                                        cartItemUUID: {
                                            cartId: cartId?cartId.id:'false',
                                            productId: productId
                                        }
                                    },
                                    update: {
                                        amount:{
                                            increment: 1
                                        }
                                    },
                                    create: {
                                        productId: productId,
                                    }
                                }
                            }
                        },
                        create: {
                            cartItems: {
                                create:{

                                }
                            },
                        }
                    }
                }
            },
            select: {
                cart: {
                    select: {
                        cartItems: true
                    }
                }
            }
        })


        return addProduct


    })
});