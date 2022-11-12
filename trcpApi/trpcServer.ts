import {initTRPC, TRPCError} from '@trpc/server';
import {TrpcContext} from "~/trcpApi/trpcContext";
import {is} from "@babel/types/lib/index-legacy";

export const t = initTRPC.context<TrpcContext>().create();
// Base router and procedure helpers

export const router = t.router;




export const publicProcedure = t.procedure;


