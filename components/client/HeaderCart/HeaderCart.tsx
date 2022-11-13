'use client'
import React, {FC, useEffect} from 'react';
import {useCartStore} from "~/store/cartStore";
import {useUserStore} from "~/store/userStore";
import Button from "~/components/ui/Button/Button";
import Link from "next/link";

type HeaderCartProps = {}

const HeaderCart: FC<HeaderCartProps> = (props: HeaderCartProps) => {

    const {cartCount, increaseCartCount} = useCartStore()

    const {isUser, userNickname, isLoading} = useUserStore()


    const {} = props

    useEffect(()=>{
        console.log('-----barState', userNickname, isUser)
    },[isUser, userNickname])


    return (
        <div>
            <span
                onClick={increaseCartCount}
            >{cartCount}</span>
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