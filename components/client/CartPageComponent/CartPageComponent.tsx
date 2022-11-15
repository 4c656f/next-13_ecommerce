'use client'
import React, {FC} from 'react';
import {CartItem, Product} from "@prisma/client"
import {trpc} from "~/utils/trpcClient";
import {useUserStore} from "~/store/userStore";
import {useCartStore} from "~/store/cartStore";
import classes from './cartPageComponent.module.css'

type cartInclude = {}

type CartPageComponentProps = {
    cart?: (CartItem & { product: Product })[] | null
}

const CartPageComponent: FC<CartPageComponentProps> = (props: CartPageComponentProps) => {

    const {
        cart
    } = props


    const isUser = useUserStore(state => state.isUser)

    const cartIds = useCartStore(state => state.cartIds)

    const {
        data,
        isFetching,
        refetch
    } = trpc.user.getUserCart.useQuery(undefined, {
        enabled: false,
        initialData: cart,
        cacheTime: 0
    })


    const decrementCartItemMutation = trpc.user.decrementCartItem.useMutation({
        onSuccess: (data) => {
            refetch()
        }
    })


    return (
        <div
            className={classes.container}
        >
            {isUser ? data?.cart.cartItems.map(value => {
                return (
                    <div
                        key={value.id}
                    >
                        <span

                        >
                            {value.product.name}
                        </span>
                        <span>
                            {value.amount}
                        </span>
                    </div>
                )
            }) : Object.keys(cartIds).map(value => {
                return (
                    <span
                        key={value}
                    >
                        {value}
                    </span>
                )
            })

            }

        </div>
    );
};

export default CartPageComponent;