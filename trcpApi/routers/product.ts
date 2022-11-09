import {z} from "zod";
import {router, t} from "../trpcServer";
import {prisma} from '~/utils/prisma'

export const productRouter = router({
    infinityProduct: t.procedure
        .input(
            z.object({
                cursor: z.object({
                    id: z.string()
                }).optional(),
                take: z.number().optional(),
                where: z.object({
                    price: z.object({
                        lt: z.number().optional(),
                        gt: z.number().optional()
                    }).optional(),
                    name: z.string().optional()
                }).optional(),
                orderBy: z.object({
                    price: z.boolean().optional(),
                    name: z.boolean().optional()
                }).optional()
            }),
        )
        .query(async ({input}) => {
            const take = input.take?input.take:10
            const {
                orderBy
            } = input

            const posts = await prisma.product.findMany({
                ...input,
                take: take+1,

                include: {
                    productType: true,
                    image: true
                },
                orderBy:{
                    price: orderBy?.price===undefined?undefined:orderBy.price?'asc':'desc',
                    name: orderBy?.name===undefined?undefined:orderBy.name?'asc':'desc'
                }
            })


            let nextCursor: typeof input.cursor | undefined = undefined;
            if (posts.length > take) {
                const nextItem = posts.pop()
                nextCursor = {id: nextItem!.id};
            }
            return {posts, nextCursor};
        }),
});