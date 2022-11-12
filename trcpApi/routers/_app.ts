import {router} from "../trpcServer";
import {productRouter} from "./product";
import {userRoute} from "~/trcpApi/routers/userRoute";


export const appRouter = router({
    product: productRouter,
    user: userRoute
});

export type AppRouter = typeof appRouter;