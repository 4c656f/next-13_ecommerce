import { createTRPCReact, httpBatchLink } from '@trpc/react-query';


import {AppRouter} from "../trcpApi/routers/_app";

export const trpc = createTRPCReact<AppRouter>();


