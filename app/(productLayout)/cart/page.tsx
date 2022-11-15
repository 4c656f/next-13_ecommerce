

import React from 'react';
import {cookies} from "next/headers";
import {validateToken} from "~/utils/tokenMethods";
import {prisma} from "~/utils/prisma";
import {trpc} from "~/utils/trpcClient";
import CartPageComponent from "~/components/client/CartPageComponent/CartPageComponent";


type CartPageProps = {

}


async function getSession() {


    const reqCookies = cookies()

    if(!reqCookies.has('refresh_token'))return null

    const refresh = reqCookies.get('refresh_token')



    const payload = await validateToken(refresh?.value)

    if(payload){
        const cart = prisma.user.findUnique({
            where: {
                username: payload['userName'] as string
            },
            select:{
                cart: {
                    select:{
                        cartItems: {
                            include:{
                                product: true
                            }
                        }
                    }
                }
            }
        })
        return cart
    }




}


const CartPage = async (props:CartPageProps) => {


    const userWithCart = await getSession()
    
    const {

    } = props



    return (
        <div>
            <CartPageComponent
                cart={userWithCart?.cart?.cartItems}
            />
        </div>
    );
};

export default CartPage;