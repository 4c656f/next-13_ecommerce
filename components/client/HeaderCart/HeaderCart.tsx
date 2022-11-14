'use client'
import React, {FC, useEffect} from 'react';
import {useCartStore} from "~/store/cartStore";
import {useUserStore} from "~/store/userStore";
import Button from "~/components/ui/Button/Button";
import Link from "next/link";
import {trpc} from "~/utils/trpcClient";

type HeaderCartProps = {}

const HeaderCart: FC<HeaderCartProps> = (props: HeaderCartProps) => {

    const cartCount = useCartStore(state => state.cartCount)

    const {isUser, userNickname, isLoading} = useUserStore()


    const {} = props

    useEffect(()=>{
        console.log('-----barState', userNickname, isUser)
    },[isUser, userNickname])

    const cartMutation = trpc.user.addToCart.useMutation({})

    useEffect(()=>{
        console.log(cartMutation.data?.cart?.cartItems.length, '----cartSubscr')
    },[cartMutation.data])

    return (
        <div>
            <span

            >{cartMutation?.data?.cart?.cartItems.length}</span>
            {
                isLoading?
                    <span>Loading</span>:
                    isUser?
                        <span>{userNickname}</span>:
                        <Button
                            href={'/sign_in'}
                            as={Link}
                        >
                            <span>signIn</span>
                        </Button>
            }
        </div>
    );
};

export default HeaderCart;