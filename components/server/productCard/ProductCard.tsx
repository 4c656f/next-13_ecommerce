import React, {FC, memo} from 'react';
import CustomImage from "../../ui/Image/CustomImage";
import {ProductType, Image, Product, Prisma} from '@prisma/client'
import classes from "./productCard.module.css"
import Link from "next/link";
import NestedLink from "~/components/ui/NestedLink/NestedLink";


type ProductCardProps = {
    product: Prisma.ProductGetPayload<{
    include:{
        image: true;
        productType:{
            include:{
                category: true
            }
        }
    }
}>;

}

const ProductCard= (props:ProductCardProps) => {

    const {
        product:{
            name,
            link,
            price,
            productType,
            image
        },
    } = props


    return (
        <div
            className={classes.container}
        >


            {image.map((value, index) => {
                    return (
                        <Link
                            key={value.id}
                            className={classes.image_container}
                            href={`/product/${link}`}
                        >
                            <CustomImage

                                src={`/productpics/${value.src}`}
                                width={224}
                                height={160}
                                quality={70}
                                alt={`${name} picture`}


                            />
                        </Link>
                    )

            })}
            <h1>{name}</h1>
            <h1>{price}</h1>
            <NestedLink>
                <Link
                    href={`/categories/${productType?.category?.name}`}
                    className={classes.link}
                >{productType?.category?.name}</Link>
                <Link
                    href={`/products/${productType?.name}`}
                    className={classes.link}
                >{productType?.name}</Link>

            </NestedLink>
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