import {z} from "zod";
import {publicProcedure, router} from "../trpcServer";
import {TRPCError} from "@trpc/server";
import {prisma} from "~/utils/prisma";
import {serializeCookie, signToken} from "~/utils/tokenMethods";
import slugify from "slugify";
import {protectedProcedure} from "~/trcpApi/trpcMiddlewares";

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
            } = input

            const isUniq = await prisma.user.findUnique({
                where: {
                    username: userName
                }
            })


            if (!isUniq) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'User not found',
                })
            }
            if (isUniq.password !== password) {
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
            } = input


            const isUniq = await prisma.user.findFirst({
                where: {
                    OR: [
                        {username: userName},
                        {email: email}
                    ]
                }
            })


            if (isUniq) {
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
    addToCart: protectedProcedure.input(z.object({
        productId: z.string()
    })).mutation(async ({input, ctx}) => {

        const {
            productId
        } = input

        const {
            refreshToken,
            userName,
            userId
        } = ctx

        const cartId = await prisma.userCart.findUniqueOrThrow({
            where: {
                userId: userId
            }
        })

        const addProduct = await prisma.user.update({
            where: {
                username: userName
            },
            data: {
                cart: {
                    upsert: {
                        update: {
                            cartItems: {
                                upsert: {
                                    where: {
                                        cartItemUUID: {
                                            cartId: cartId.id,
                                            productId: productId
                                        }
                                    },
                                    update: {
                                        amount: {
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
                                create: {
                                    productId: productId,
                                },

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


    }),
    decrementCartItem: protectedProcedure
        .input(z.object({
            productId: z.string()
        })).mutation(async ({input, ctx}) => {
            const {
                productId
            } = input

            const {
                userName,
                userId
            } = ctx




            const getCart = await prisma.userCart.findUniqueOrThrow({
                where:{
                    userId: userId
                }
            })

            const removedProduct = await prisma.cartItem.update({
                where:{
                    cartItemUUID:{
                        productId: productId,
                        cartId: getCart.id
                    }
                },
                data:{
                    amount: {
                        decrement: 1
                    }

                }
            })
            return removedProduct



        }),


    getSession: protectedProcedure
        .input(
            z.string().optional()
        )
        .query(async ({input, ctx}) => {


            return {userName: ctx.userName}

        }),
    getUserCart: protectedProcedure
        .input(z.undefined())
        .query(async ({input, ctx})=>{

            const {userId} = ctx

            const cart = await prisma.userCart.findUniqueOrThrow({
                where:{
                    userId: userId
                },
                select:{

                    cartItems:{
                        where:{
                            amount:{
                                gt:0
                            }
                        },
                        include:{
                            product: true
                        }
                    }
                }
            })
            return {cart: cart}
    })
});