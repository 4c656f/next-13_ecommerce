import {router } from "../trpcServer";
import {productRouter} from "./product";
import {t} from '../trpcServer'
import {z} from "zod";


export const appRouter = router({
    product: t.procedure.input((val: unknown) => {
        if (typeof val === 'string') return val;
        throw new Error(`Invalid input: ${typeof val}`);
    })
        .query(({input}) => {

            return 'someStr';
        })
});

export type AppRouter = typeof appRouter;