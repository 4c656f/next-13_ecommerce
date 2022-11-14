'use client'

import React, {FC, useEffect} from 'react';
// import {cookies} from "next/headers";
// import {validateToken} from "~/utils/tokenMethods";
// import {prisma} from "~/utils/prisma";
import {trpc} from "~/utils/trpcClient";


type CartPageProps = {

}


// async function getSession() {
//
//
//     const reqCookies = cookies()
//
//     if(!reqCookies.has('refresh_token'))return
//
//     const refresh = reqCookies.get('refresh_token')
//
//
//
//     const payload = await validateToken(refresh?.value)
//
//     if(payload){
//         const cart = prisma.user.findUnique({
//             where: {
//                 username: payload['userName'] as string
//             },
//             include:{
//                 cart: {
//                     include:{
//                         products: true
//                     }
//                 }
//             }
//         })
//         return cart
//     }
//
//
//
//
// }


const CartPage = (props:CartPageProps) => {


    // const userWithCart = await getSession()
    
    const {

    } = props


    const cartMutation = trpc.user.addToCart.useMutation()




    return (
        <div>

        </div>
    );
};

export default CartPage;