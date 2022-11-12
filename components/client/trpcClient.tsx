"use client";
import {QueryCache, QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { httpBatchLink, loggerLink, TRPCClientError } from "@trpc/client";
import { useState } from "react";
import superjson from "superjson";
import { trpc } from '~/utils/trpcClient';
import {TRPCError} from "@trpc/server";
import {getHTTPStatusCodeFromError} from "@trpc/server/http";
import {useUserStore} from "~/store/userStore";
import {redirect} from "next/navigation";

function getBaseUrl() {
    if (typeof window !== "undefined")
        // browser should use relative path
        return "";
    if (process.env.VERCEL_URL)
        // reference for vercel.com
        return `https://${process.env.VERCEL_URL}`;
    if (process.env.RENDER_INTERNAL_HOSTNAME)
        // reference for render.com
        return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
    // assume localhost
    return `http://localhost:${process.env.PORT ?? 3000}`;
}


export function ClientProvider(props: { children: React.ReactNode }) {



    const setIsUser = useUserStore(state => state.setIsUser)

    const [queryClient] = useState(() => new QueryClient({
        queryCache: new QueryCache({
            onError: (error) => {
                console.log('errorMiddleware')
                setIsUser(false)
                // console.log(error)
                // if (error instanceof TRPCError){
                //     const httpCode = getHTTPStatusCodeFromError(error);
                //
                // }
            }

        })
    }));
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: `${getBaseUrl()}/api/trpc`,
                })
            ],
        }),
    );
    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {props.children}
            </QueryClientProvider>
        </trpc.Provider>
    );
}
