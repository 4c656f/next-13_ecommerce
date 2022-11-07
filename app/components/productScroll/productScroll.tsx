'use client';
import React, {FC, useState, FocusEvent, useEffect} from 'react';
import {Product, Image, ProductType} from "@prisma/client";
import classes from "./productScroll.module.css";
import ProductCard from "../productCard/ProductCard";
import Input from "../ui/Input/Input";
import {ProductService} from "../../../services/productService";




type ProductIncludes = {
    image: Image[]
    productType: ProductType | null
} & Product


type ProductScrollProps = {
    initialProducts: ProductIncludes[]
}


const ProductScroll:FC<ProductScrollProps> = (props:ProductScrollProps) => {

    const {
        initialProducts
    } = props


    const [inputFromValue, setInputFromValue] = useState('')
    const [inputToValue, setInputToValue] = useState('')

    const handleBlur = (e:FocusEvent<HTMLInputElement>) => {
        if(!inputToValue&&!inputFromValue)return

    }

    useEffect(()=>{
        console.log('----request')
        ProductService.getProduct({
            take: '10',
            where: {
                price: {lt: 7000}
            }
        }).then(value => {
            console.log(value.data)
        })

    },[])
    return (
        <div
            className={classes.container}
        >
            <div
                className={classes.filters_container}
            >
                <h3>PriceFilter</h3>
                <Input
                    placeholder={'from'}
                    value={inputFromValue}
                    onChange={event => setInputFromValue(event.target.value)}
                    onBlur={handleBlur}
                />
                <Input
                    placeholder={'to'}
                    value={inputToValue}
                    onChange={event => setInputToValue(event.target.value)}
                    onBlur={handleBlur}
                />

            </div>


            <div
                className={classes.product_container}
            >
            {initialProducts.map((value, index) => {
                return(
                    <ProductCard
                    key={value.id}
                    product={value}
                    productType={value.productType}
                    images={value.image}
                />
                )
            })}
            </div>
        </div>
    );
};

export default ProductScroll;