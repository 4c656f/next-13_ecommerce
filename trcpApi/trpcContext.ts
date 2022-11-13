// -------------------------------------------------
// @filename: context.ts
// -------------------------------------------------
import {inferAsyncReturnType} from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createTrpcContext = async (opts: trpcNext.CreateNextContextOptions) => {


    const requestCookies = opts.req.cookies;

    if (requestCookies?.['refresh_token']) {
        return {
            refreshToken: requestCookies['refresh_token'],
            res: opts.res
        }
    }

    return {
        res: opts.res
    }
};

export type TrpcContext = inferAsyncReturnType<typeof createTrpcContext>;
