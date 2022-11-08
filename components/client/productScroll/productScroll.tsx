'use client';
import React, {FC, useState, FocusEvent, useEffect} from 'react';
import {Product, Image, ProductType} from "@prisma/client";
import classes from "./productScroll.module.css";
import ProductCard from "../../server/productCard/ProductCard";
import Input from "../../ui/Input/Input";
import {trpc} from "../../../utils/trpcClient";
import {appQueryContext} from "../../../utils/appQueryClient";




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



    const [range, setRange] = useState({gt: 0, lt: 0})

    const res = trpc.product.hello.useQuery({where: {
        price: range
        }}, {initialData: ()=>initialProducts})

    const handleBlur = (e:FocusEvent<HTMLInputElement>) => {
        if(!inputToValue&&!inputFromValue)return
        setRange({gt: Number(inputFromValue), lt: Number(inputToValue)})
    }

    useEffect(()=>{
        console.log(res.isLoading, res.data)

    },[res.isLoading])
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
            {res.data?.map((value, index) => {
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