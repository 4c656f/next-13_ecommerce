'use client'
import React, {FC, useEffect} from 'react';
import {useCartStore} from "~/store/cartStore";
import {useUserStore} from "~/store/userStore";
import Button from "~/components/ui/Button/Button";
import Link from "next/link";
import {trpc} from "~/utils/trpcClient";
import {data} from "browserslist";


type HeaderCartProps = {}

const HeaderCart: FC<HeaderCartProps> = (props: HeaderCartProps) => {

    const cartLength = useCartStore(state => state.length)

    const {isUser, userNickname, isLoading} = useUserStore()


    const {} = props

    useEffect(()=>{
        console.log('-----barState', userNickname, isUser)
    },[isUser, userNickname])


    const {
        isFetching,
        data,
        isError
    } = trpc.protected.getUserCart.useQuery(undefined,{
        refetchOnMount: true,
        retry: false,
        onError: (err)=>{

        },
    })
    //
    // useEffect(()=>{
    //     console.log(cartQuery.data, '----cartQuerystate')
    //
    // },[cartQuery.data])


    return (
        <div>
            <span

            >
                {
                isUser?
                    data?.cart?.cartItems.length:
                    cartLength

                    }
            </span>
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