import {z} from "zod";
import {router} from "../trpcServer";
import {protectedProcedure} from "~/trcpApi/trpcMiddlewares";


export const protectedRoute = router({
    getSession: protectedProcedure
        .input(
            z.string().optional()
        )
        .query(async ({input, ctx}) => {

            return {userName: ctx.userName}

        })
});