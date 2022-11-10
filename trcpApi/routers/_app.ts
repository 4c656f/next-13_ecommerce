import {router } from "../trpcServer";
import {productRouter} from "./product";
import {t} from '../trpcServer'
import {z} from "zod";
import {userRouter} from "~/trcpApi/routers/signIn";


export const appRouter = router({
    product: productRouter,
    user: userRouter
});

export type AppRouter = typeof appRouter;