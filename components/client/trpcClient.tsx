"use client";
import {QueryCache, QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {httpBatchLink, TRPCClientError} from "@trpc/client";
import {useState} from "react";
import {trpc} from '~/utils/trpcClient';
import {useUserStore} from "~/store/userStore";
import {TRPCError} from "@trpc/server";

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
        defaultOptions: {
            mutations: {
                cacheTime: 1000 * 60 * 60 * 24
            }
        },
        queryCache: new QueryCache({

            onError: (error, query) => {
                const customError = error as TRPCClientError<any>

                if(customError.data.code === "UNAUTHORIZED"){
                    setIsUser({isUser: false})

                }


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
