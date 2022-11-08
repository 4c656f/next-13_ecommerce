import { createTRPCReact, httpBatchLink } from '@trpc/react-query';


import {AppRouter} from "../backend/routers/_app";

export const trpc = createTRPCReact<AppRouter>();


