import {router} from "../trpcServer";
import {productRouter} from "./product";

import {userRouter} from "~/trcpApi/routers/userRoute";


export const appRouter = router({
    product: productRouter,

    user: userRouter
});

export type AppRouter = typeof appRouter;