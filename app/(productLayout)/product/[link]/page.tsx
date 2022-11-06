import React, {FC} from 'react';
import {prisma} from "../../../../lib/prisma";
import {notFound} from "next/navigation";
import ProductCard from "../../../components/productCard/ProductCard";

type PageProps = {
    params: { link: string }
}

export async function generateStaticParams() {

    const products = await prisma.product.findMany()

    return products.map((value) => ({
        link: value.link,
    }));
}
async function getProduct(productLink:string) {

    const res = await prisma.product.findFirst({
        where:{
            link: productLink
        },
        include:{
            productType:true,
            image: true
        }
    })

    if (!res){
        console.log("-------NOTFOUND")
        notFound()
    }

    return res;
}

const Page = async (props:PageProps) => {

    const {
        params
    } = props

    const product = await getProduct(params.link)


    return (
        <div>
            <ProductCard
                product={product}
                productType={product.productType}
                images={product.image}
            />
        </div>
    );
};

export default Page;