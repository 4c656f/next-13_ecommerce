import {router } from "../trpcServer";
import {productRouter} from "./product";
import {t} from '../trpcServer'
import {z} from "zod";


export const appRouter = router({
    product: productRouter
});

export type AppRouter = typeof appRouter;