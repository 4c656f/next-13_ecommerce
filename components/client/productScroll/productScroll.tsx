'use client';
import React, {FC, FocusEvent, useEffect, useRef, useState} from 'react';
import {Image, Product, ProductType} from "@prisma/client";
import classes from "./productScroll.module.css";
import ProductCard from "../../server/productCard/ProductCard";
import Input from "../../ui/Input/Input";
import {trpc} from "../../../utils/trpcClient";


type ProductIncludes = {
    image: Image[]
    productType: ProductType | null
} & Product


type ProductScrollProps = {
    initialProducts: (Product & { image: Image[]; productType: ProductType | null; })[]
}

const ProductScroll: FC<ProductScrollProps> = (props: ProductScrollProps) => {

    const {
        initialProducts
    } = props

    const elemRef = useRef<any>(null)
    const observerRef = useRef<any>(null)

    const [inputFromValue, setInputFromValue] = useState('')
    const [inputToValue, setInputToValue] = useState('')


    const [range, setRange] = useState<undefined | { lt?: number, gt?: number }>()

    const {
        data,
        isLoading,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
        isRefetching,
        isFetching,

    } = trpc.product.infinityProduct.useInfiniteQuery({
        take: 10,
        where: {
            price: range && range
        }
    }, {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        initialData: {
            pages: [{
                posts: initialProducts,
                nextCursor: {id: initialProducts[initialProducts.length - 1].id}
            }],
            pageParams: []
        },
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    })

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {

        setRange({
            gt: inputFromValue?Number(inputFromValue):undefined,
            lt: inputToValue?Number(inputToValue):undefined
        })
    }
    // useEffect(() => {
    //     console.log('isFetchingNextPage', isFetchingNextPage,
    //         'isLoading', isLoading,
    //         'isInitialLoading',isInitialLoading,
    //         'isRefetching',isRefetching,
    //         'isFetching',isFetching,
    //     )
    // }, [isFetchingNextPage, isLoading, isInitialLoading,isRefetching,isFetching])


    //OBSERVER EFFECT
    useEffect(() => {
        if (!hasNextPage) {
            if (observerRef.current) observerRef.current.disconnect();
            return;
        }
        ;
        if (observerRef.current) observerRef.current.disconnect();
        if (isFetching) return;
        const observerRefCallback = (entries: any[]) => {

            if (entries[0].isIntersecting && !isLoading) {
                console.log('intersecting')
                fetchNextPage()
            }

        }

        observerRef.current = new IntersectionObserver(observerRefCallback)
        observerRef.current.observe(elemRef.current)

    }, [isFetching])

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

            {isRefetching?<h1>Loading...</h1>:<div
                className={classes.product_container}
            >
                {data?.pages.map((TData, index) => {

                    const {
                        posts
                    } = TData

                    return posts.map(value => {
                        return (
                            <ProductCard
                                key={value.id}
                                product={value}
                                productType={value.productType}
                                images={value.image}
                            />
                        )
                    })


                })}
            </div>}
            {isFetchingNextPage && <h1>...Loading</h1>}
            <div
                ref={elemRef}
                style={{
                    height: '10px',
                    width: '10px',
                    backgroundColor: "red"
                }}
            ></div>
        </div>
    );
};

export default ProductScroll;