import { z } from "zod";
import {publicProcedure, router, t } from "../trpcServer";
import {prisma} from '~/utils/prisma'

export const productRouter = router({
    hello: t.procedure
        .input(
            z.object({
                skip: z.number().optional(),
                take: z.number().optional(),
                where: z.object({
                    price: z.object({
                        lt: z.number().optional(),
                        gt: z.number().optional()
                    }).optional(),
                    name: z.string().optional()
                }).optional()
            }),
        )
        .query( async ({ input }) => {

            const data = await prisma.product.findMany({
                ...input, include:{
                    productType: true,
                    image: true
                }})

            return data;
        }),
});