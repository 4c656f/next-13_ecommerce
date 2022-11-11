import {z} from "zod";
import {protectedProcedure, publicProcedure, router, t} from "../trpcServer";



export const protectedRoute = router({
    hello: protectedProcedure
        .input(
            z.object({login: z.string()})
        )
        .query(async ({input}) => {


            console.log('request')

            return{someKey: 'someValue'}

        })
});