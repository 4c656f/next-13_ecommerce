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
                    price: z.literal('asc').optional().or(z.literal('desc').optional()),
                    name: z.literal('asc').optional().or(z.literal('desc').optional())
                })
            }),
        )
        .query(async ({input}) => {
            const take = input.take?input.take:10
            const {
                orderBy
            } = input

            console.log(orderBy)
            const posts = await prisma.product.findMany({
                ...input,
                take: take+1,

                include: {
                    productType: true,
                    image: true
                },

            })


            let nextCursor: typeof input.cursor | undefined = undefined;
            if (posts.length > take) {
                const nextItem = posts.pop()
                nextCursor = {id: nextItem!.id};
            }
            return {posts, nextCursor};
        }),
});