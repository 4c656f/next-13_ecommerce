import {router} from "../trpcServer";
import {productRouter} from "./product";
import {protectedRoute} from "~/trcpApi/routers/protectedRoute";


export const appRouter = router({
    product: productRouter,
    user: protectedRoute
});

export type AppRouter = typeof appRouter;