import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "~/backend/routers/_app";


export type Inputs = inferRouterInputs<AppRouter>;
export type Outputs = inferRouterOutputs<AppRouter>;