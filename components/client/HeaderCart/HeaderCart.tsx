'use client'
import React, {FC} from 'react';
import {useCartStore} from "~/store/cartStore";

type HeaderCartProps = {

}

const HeaderCart:FC<HeaderCartProps> = (props:HeaderCartProps) => {

    const {cartCount, increaseCartCount} = useCartStore()

    const {
        
    } = props

    
    return (
        <div>
            <span
                onClick={increaseCartCount}
            >{cartCount}</span>
        </div>
    );
};

export default HeaderCart;