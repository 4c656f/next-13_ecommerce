import { z } from "zod";
import {publicProcedure, router, t } from "../trpcServer";


export const productRouter = router({
    hello: t.procedure
        .input(
            z.object({
                text: z.string().nullish(),
            }),
        )
        .query(({ input }) => {
            return 'someResponse';
        }),
});