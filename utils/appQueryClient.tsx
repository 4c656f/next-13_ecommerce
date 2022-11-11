'use client';

import 'client-only';

import {QueryCache, QueryClient} from '@tanstack/react-query';
import { Context, createContext } from 'react';

export const appQueryClient = new QueryClient({
    // queryCache: new QueryCache({
    //     onError: (error,query) =>{
    //         console.error(`Something went wrong: ${error}`)
    //         query.fetch()
    //     }
    // }),

})
export const appQueryContext: Context<QueryClient | undefined> = createContext(appQueryClient) as Context<
  QueryClient | undefined
>;

