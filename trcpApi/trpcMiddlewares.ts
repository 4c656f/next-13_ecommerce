import {TRPCError} from "@trpc/server";
import {t} from "~/trcpApi/trpcServer";
import {validateToken} from "~/utils/tokenMethods";

const isAuthed = t.middleware(async ({ next, ctx }) => {

    const {refreshToken} = ctx

    if(!refreshToken){
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Bad token'
        })
    }

    let payload
    try {
        payload = await validateToken(refreshToken)

    }catch (e) {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Bad token'
        })
    }




    return next({
        ctx:{
            user: payload
        }
    });
});
export const protectedProcedure = t.procedure.use(isAuthed);