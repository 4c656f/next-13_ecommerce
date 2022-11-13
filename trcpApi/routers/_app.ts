import {router} from "../trpcServer";
import {productRouter} from "./product";
import {protectedRoute} from "~/trcpApi/routers/protectedRoute";
import {userRouter} from "~/trcpApi/routers/userRoute";


export const appRouter = router({
    product: productRouter,
    protected: protectedRoute,
    user: userRouter
});

export type AppRouter = typeof appRouter;