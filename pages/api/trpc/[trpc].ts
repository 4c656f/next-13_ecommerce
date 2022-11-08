import { createNextApiHandler } from "@trpc/server/adapters/next";

import { appRouter } from "~/backend/routers/_app";



export default createNextApiHandler({
    router: appRouter,
    createContext: () => ({}),
});