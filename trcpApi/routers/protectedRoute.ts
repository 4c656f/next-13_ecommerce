import {z} from "zod";
import {router} from "../trpcServer";
import {protectedProcedure} from "~/trcpApi/trpcMiddlewares";
import {prisma} from "~/utils/prisma";


export const protectedRoute = router({
    getSession: protectedProcedure
        .input(
            z.string().optional()
        )
        .query(async ({input, ctx}) => {

            return {userName: ctx.userName}

        }),
    getUserCart: protectedProcedure
        .input(
            z.undefined()
        ).query(async ({input, ctx})=>{
            const cart = prisma.user.findUnique({
                where:{
                    username: ctx.userName
                },
                select:{
                    cart:{
                        select:{
                            cartItems: true
                        }

                    }
                }
            })
            return cart


        })
});