'use client';
import React, {FC, FocusEvent, useEffect, useRef, useState} from 'react';
import {Image, Product, ProductType, Prisma} from "@prisma/client";
import classes from "./productScroll.module.css";
import ProductCard, {ProductCardPlaceholder} from "../../server/productCard/ProductCard";
import {trpc} from "../../../utils/trpcClient";
import Button from "~/components/ui/Button/Button";
import {AtMostOneOf} from "~/types/IAtMostOne";
import ArrowIcon from '~/materials/icons/arrow-left.svg'
import useHandleProductScroll from "~/hooks/handleProductScroll/useHandleProductScroll";





type ProductScrollProps = {
    initialProducts: Prisma.ProductGetPayload<{
        include:{
            image: true;
            productType:{
                include:{
                    category: true
                }
            }
        }
    }>[]
}

const ProductScroll: FC<ProductScrollProps> = (props: ProductScrollProps) => {

    const {
        initialProducts
    } = props

    const elemRef = useRef<any>(null)
    const observerRef = useRef<any>(null)


    const [orderBy, setOrderBy] = useState<AtMostOneOf<{
        price: boolean,
        name: boolean,
    }>>({price: true})

    const [inputFromValue, setInputFromValue] = useState('')
    const [inputToValue, setInputToValue] = useState('')


    const [range, setRange] = useState<undefined | { lt?: number, gt?: number }>()

    const {state, actions, dispatch} = useHandleProductScroll()

    const {
        data,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
        isRefetching,
        isFetching,

    } = trpc.product.infinityProduct.useInfiniteQuery(state, {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        initialData: {
            pages: [{
                nextCursor: {id: initialProducts[initialProducts.length - 1].id},
                posts: initialProducts.slice(0, initialProducts.length - 1),

            }],
            pageParams: []
        },
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    })

    useEffect(() => {
        console.log(orderBy)
    }, [orderBy])
    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {

        setRange({
            gt: inputFromValue ? Number(inputFromValue) : undefined,
            lt: inputToValue ? Number(inputToValue) : undefined
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
        if (observerRef.current) observerRef.current.disconnect();
        if (isFetching || !hasNextPage) return;
        const observerRefCallback = (entries: any[]) => {

            if (entries[0].isIntersecting) {
                console.log('intersecting')
                fetchNextPage()
            }

        }

        observerRef.current = new IntersectionObserver(observerRefCallback)
        observerRef.current.observe(elemRef.current)

    }, [isFetching, hasNextPage])


    const handleOrderClick = (type: "price" | "name") => {
        dispatch({type: actions.HandleOrder, payload: {value: type}})
    }
    useEffect(()=>{
        console.log('reducerChanged')
        console.log(state.orderBy)
    },[state])

    return (
        <div
            className={classes.container}
        >
            <div
                className={classes.filters_container}
            >
                <h3>Order by:</h3>
                <Button
                    onClick={() => handleOrderClick('price')}
                    icon={
                        <ArrowIcon
                            className={classes.icon}
                            data-isactive={state.orderBy?.price===undefined?null:state.orderBy?.price==='asc'}
                        />
                    }
                    defaultIconStyles={true}
                >
                    <span>price</span>
                </Button>
                <Button

                    onClick={() => handleOrderClick('name')}
                    icon={<ArrowIcon
                        className={classes.icon}
                        data-isactive={state.orderBy?.name===undefined?null:state.orderBy?.name==='asc'}
                    />}
                    defaultIconStyles={true}
                >
                    <span>name</span>
                </Button>

            </div>
            <div
                className={classes.product_container}
            >
                {!isRefetching?data?.pages.map((TData, index) => {

                    const {
                        posts
                    } = TData

                    return posts.map(value => {
                        return (
                            <ProductCard
                                key={value.id}
                                product={value}
                            />
                        )
                    })


                }):<ProductCardPlaceholder/>

                }
            </div>
            {isFetchingNextPage && <h1>...Loading</h1>}
            {!hasNextPage && <h1>that all</h1>}
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