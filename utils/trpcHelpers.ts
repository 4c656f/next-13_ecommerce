import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { default as superjson } from 'superjson';



import { createTrpcContext } from '~/backend/trpcContext';
import {appRouter} from "../trcpApi/routers/_app";


export const serverQuery = appRouter.createCaller({});

export const serverQueryWithContext = async () => appRouter.createCaller(await createTrpcContext());