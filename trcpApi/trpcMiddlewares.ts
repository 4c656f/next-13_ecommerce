import {TRPCError} from "@trpc/server";
import {t} from "~/trcpApi/trpcServer";
import {validateToken} from "~/utils/tokenMethods";

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

    return next({
        ctx: {
            userName: payload?.userName as string
        }
    });
});
export const protectedProcedure = t.procedure.use(isAuthed);