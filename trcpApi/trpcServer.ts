import {initTRPC} from '@trpc/server';
import {TrpcContext} from "~/trcpApi/trpcContext";

export const t = initTRPC.context<TrpcContext>().create();
// Base router and procedure helpers

export const router = t.router;


export const publicProcedure = t.procedure;


