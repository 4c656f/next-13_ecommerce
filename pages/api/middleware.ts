import {NextMiddleware} from "next/server";

export async function middleware(request:any){
    console.log('middleware', request)
}