import React, {FC} from 'react';
import CustomImage from "../ui/Image/CustomImage";
import {ProductType, Image} from '@prisma/client'
import classes from "./productCard.module.css"


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
            <h1>{name}</h1>
            <h3>{productType?.name}</h3>
            {images.map((value, index) => {
                    return (
                        <CustomImage
                            key={value.id}
                            src={`/productpics/${value.src}`}
                            width={500}
                            height={500}
                            alt={`${name} picture`}/>
                    )

            })}
        </div>
    );
};

export default ProductCard;