import {z} from "zod";
import {publicProcedure, router} from "../trpcServer";

export const userRouter = router({
    signIn: publicProcedure
        .input(z.object({}))
        .query(async ({input}) => {
            console.log('login query')
        }),
    signUp: publicProcedure
        .input(z.object({}))
        .mutation(async ({input}) => {

        }),
});