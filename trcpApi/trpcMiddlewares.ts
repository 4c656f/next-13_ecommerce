import {TRPCError} from "@trpc/server";
import {t} from "~/trcpApi/trpcServer";
import {serializeCookie, signToken, validateToken} from "~/utils/tokenMethods";

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

    const {refresh} = await signToken({
        userName: payload['userName']
    })
    console.log('refreshMiddleware')

    const serializedRefresh = serializeCookie('refresh_token', refresh, 60 * 60 * 24 * 30)
    ctx.res.setHeader('Set-Cookie', serializedRefresh)
    return next({
        ctx: {
            userName: payload['userName'] as string
        }
    });
});
export const protectedProcedure = t.procedure.use(isAuthed);