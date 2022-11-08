import { createNextApiHandler } from "@trpc/server/adapters/next";
import * as trpcNext from '@trpc/server/adapters/next';
import { appRouter } from "~/backend/routers/_app";
import {AppRouter} from "~/backend/routers/_app"
import {createTrpcContext} from "../../../backend/trpcContext";


export default trpcNext.createNextApiHandler({
    router: appRouter,
    /**
     * @link https://trpc.io/docs/context
     */
    createContext: createTrpcContext,
    /**
     * @link https://trpc.io/docs/error-handling
     */
    onError({ error }) {
        if (error.code === 'INTERNAL_SERVER_ERROR') {
            // send to bug reporting
            console.error('Something went wrong', error);
        }
    },
    batching: {
        enabled: true,
    },
    /**
     * @link https://trpc.io/docs/caching#api-response-caching
     */
    // responseMeta() {
    //   // ...
    // },
});
