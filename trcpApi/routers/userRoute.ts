import {z} from "zod";
import {publicProcedure, router, t} from "../trpcServer";
import {protectedProcedure} from "~/trcpApi/trpcMiddlewares";



export const userRoute = router({
    validateSession: protectedProcedure
        .input(
            z.string().optional()
        )
        .query(async ({input, ctx}) => {

            if (ctx?.user)

            console.log(ctx?.user)

            return{status: true}

        })
});