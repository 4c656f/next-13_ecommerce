import React, {FC, memo} from 'react';
import CustomImage from "../../ui/Image/CustomImage";
import {ProductType, Image, Product} from '@prisma/client'
import classes from "./productCard.module.css"
import Link from "next/link";


type ProductCardProps = {
    product: Product;
    productType: ProductType | null;
    images: Image[]
}

const ProductCard= (props:ProductCardProps) => {

    const {
        product:{
            name,
            link,
            price
        },
        productType,

        images
    } = props


    return (
        <div
            className={classes.container}
        >


            {images.map((value, index) => {
                    return (
                        <Link
                            key={value.id}
                            className={classes.image_container}
                            href={`/product/${link}`}
                        >
                            <CustomImage

                                src={`/productpics/${value.src}`}
                                width={500}
                                height={500}
                                alt={`${name} picture`}


                            />
                        </Link>
                    )

            })}
            <h1>{name}</h1>
            <h1>{price}</h1>
            <h3>{productType?.name}</h3>
        </div>
    );
};
export function ProductCardPlaceholder (){
    return(
        <>
            {Array.from(Array(10).keys()).map(value => {
                return(
                    <div
                        key={value}
                        className={classes.container}
                    >

                        <div
                            className={classes.sceleton_image}
                        >
                        </div>
                        <div
                            className={classes.sceleton_property}
                        ></div>
                        <div
                            className={classes.sceleton_property}
                        ></div>
                    </div>
                )
            })
            }
        </>
    )
}

export default memo(ProductCard);