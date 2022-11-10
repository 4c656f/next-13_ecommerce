import React, {FC} from 'react';
import {prisma} from "../../../../utils/prisma";
import {notFound} from "next/navigation";
import ProductCard from "../../../../components/server/productCard/ProductCard";

type PageProps = {
    params: { link: string }
}

export async function generateStaticParams() {


    console.log('------GENERATE PRODUCT ROUTES')
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
            productType: {
                include: {
                    category: true
                }
            },
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

            />
        </div>
    );
};

export default Page;