import {TRPCError} from "@trpc/server";
import {t} from "~/trcpApi/trpcServer";
import {serializeCookie, signToken, validateToken} from "~/utils/tokenMethods";
import {prisma} from "~/utils/prisma";

const isAuthed = t.middleware(async ({next, ctx}) => {

    const {refreshToken} = ctx

    if (!refreshToken) {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Bad token'
        })
    }

    const payload = await validateToken(refreshToken)

    if(!payload){
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Invalid token'
        })
    }

    const user = await prisma.user.findUniqueOrThrow({
        where:{
            username: payload.userName as string
        }
    })


    const {refresh} = await signToken({
        userName: user.username
    })
    console.log('refreshMiddleware')

    const serializedRefresh = serializeCookie('refresh_token', refresh, 60 * 60 * 24 * 30)
    ctx.res.setHeader('Set-Cookie', serializedRefresh)
    return next({
        ctx: {
            userName: user.username,
            userId: user.id
        }
    });
});
export const protectedProcedure = t.procedure.use(isAuthed);