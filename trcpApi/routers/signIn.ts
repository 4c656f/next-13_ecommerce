import {z} from "zod";
import {router, t} from "../trpcServer";
import {prisma} from '~/utils/prisma'
import {headers} from "next/headers";


export const userRouter = router({
    signIn: t.procedure
        .input(
            z.object({login: z.string()})
        )
        .query(async ({input}) => {





            return{
                headers(){
                    cookie: 'serialize'
                }

            }

        })
});