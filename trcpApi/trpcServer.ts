import {initTRPC, TRPCError} from '@trpc/server';
import {TrpcContext} from "~/trcpApi/trpcContext";
import {is} from "@babel/types/lib/index-legacy";

export const t = initTRPC.context<TrpcContext>().create();
// Base router and procedure helpers

export const router = t.router;

const isAuthed = t.middleware(({ next, ctx }) => {

    const {isAuth} = ctx

    if(!isAuth){
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Bad token'
        })
    }

    return next();
});


export const publicProcedure = t.procedure;


export const protectedProcedure = t.procedure.use(isAuthed);