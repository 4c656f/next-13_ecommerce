// -------------------------------------------------
// @filename: context.ts
// -------------------------------------------------
import {inferAsyncReturnType} from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createTrpcContext = async (opts: trpcNext.CreateNextContextOptions)=> {


    const session = opts.req.cookies;

    if (session?.['access_token']) {
        return {isAuth: true}
    }

    return {isAuth: false}
};

export type TrpcContext = inferAsyncReturnType<typeof createTrpcContext>;
