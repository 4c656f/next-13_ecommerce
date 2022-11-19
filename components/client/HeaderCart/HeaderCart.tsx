'use client'
import React, {FC, useEffect, useState} from 'react';
import {useCartStore} from "~/store/cartStore";
import {useUserStore} from "~/store/userStore";
import Button from "~/components/ui/Button/Button";
import Link from "next/link";
import {trpc} from "~/utils/trpcClient";
import classes from './headerCart.module.css'


type HeaderCartProps = {}

const HeaderCart: FC<HeaderCartProps> = (props: HeaderCartProps) => {

    const {cartLength, hydrateStore} = useCartStore(state => ({cartLength: state.length, hydrateStore: state.hydrateStore}))

    const {isUser, userNickname, isLoading} = useUserStore()

    const [isMenuShown, setIsMenuShown] = useState(false)

    const {} = props




    const {
        isFetching,
        data,
        isError,
        refetch
    } = trpc.user.getUserCart.useQuery(undefined,{
        enabled: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: false,
        cacheTime: 0,
        onSuccess: (data)=>{
          console.log('cartQueryrefetch--------', data)
        },
        onError: (err)=>{

        },
    })


    useEffect(()=>{
        if(isLoading)return
        if(!isUser){
            hydrateStore()
            return;
        }
        refetch()
    },[isUser, isLoading])



    return (
        <>
            <div
                className={`${classes.container} ${isMenuShown&&classes.active_container}`}
            >
                <Button

                    className={isLoading?classes.loading:undefined}
                    href={'/cart'}
                    as={Link}
                >
                    <span>{
                    isUser?
                        data?.cart?.cartItems.length:
                        cartLength

                    }</span>
                </Button>
                {
                    isLoading?
                        <span>Loading</span>:
                        isUser?
                            <span>{userNickname}</span>:
                            <>
                                <Button
                                    href={'/sign_in'}
                                    as={Link}
                                >
                                    <span>signIn</span>
                                </Button>
                                <Button
                                href={'/sign_up'}
                                as={Link}
                                >
                                <span>signUp</span>
                                </Button>
                            </>
                }

            </div>

            <Button
                className={classes.right_header_show}
                onClick={()=>setIsMenuShown(prevState => !prevState)}
            >
                <span>{isMenuShown?'hide menu':'show menu'}</span>
            </Button>
        </>
    );
};

export default HeaderCart;