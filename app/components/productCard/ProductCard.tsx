import React, {FC} from 'react';
import CustomImage from "../ui/Image/CustomImage";
import {ProductType, Image} from '@prisma/client'
import classes from "./productCard.module.css"
import Link from "next/link";


type ProductCardProps = {
    name: string;
    productType: ProductType | null;
    images: Image[]
}

const ProductCard:FC<ProductCardProps> = (props:ProductCardProps) => {

    const {
        name,
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
                            href={`/product/${name}`}
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
            <h3>{productType?.name}</h3>
        </div>
    );
};

export default ProductCard;