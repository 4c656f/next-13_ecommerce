import React from 'react';
import {prisma} from "../../../../utils/prisma";
import {notFound} from "next/navigation";
import ProductCard from "../../../../components/server/productCard/ProductCard";

type PageProps = {
    params: { link: string }
}
export const revalidate = 3600;



async function getProduct(productLink: string) {

    console.log('PRODUCT REVALIDATION-----')

    const res = await prisma.product.findUnique({
        where: {
            link: productLink
        },
        include: {
            productType: {
                include: {
                    category: true
                }
            },
            image: true
        }
    })

    if (!res) {
        console.log("-------NOTFOUND")
        notFound()
    }

    return res;
}

export default async function Page (props: PageProps) {

    const {
        params
    } = props

    const product = await getProduct(params.link)


    return (
        <div>
            <ProductCard
                product={product}
            />
        </div>
    );
};

export async function generateStaticParams() {


    console.log('------GENERATE PRODUCT ROUTES')
    const products = await prisma.product.findMany()

    return products.map((value) => ({
        link: value.link,
    }));
}
