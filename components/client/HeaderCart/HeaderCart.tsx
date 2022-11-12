'use client'
import React, {FC} from 'react';
import {useCartStore} from "~/store/cartStore";
import {useUserStore} from "~/store/userStore";

type HeaderCartProps = {

}

const HeaderCart:FC<HeaderCartProps> = (props:HeaderCartProps) => {

    const {cartCount, increaseCartCount} = useCartStore()

    const isUser = useUserStore(state => state.isUser)




    const {
        
    } = props

    
    return (
        <div>
            <span
                onClick={increaseCartCount}
            >{cartCount}</span>
            <span>{isUser?'user':'no'}</span>
        </div>
    );
};

export default HeaderCart;