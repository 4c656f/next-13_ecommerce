import React from 'react';
import {prisma} from "../../../../utils/prisma";
import {notFound} from "next/navigation";

export const revalidate = 3600;

async function getCategory(productTypeName: string) {

    console.log('TYPY OF PRODUCT REVALIDATION-----')


    const res = await prisma.productType.findFirst({
        where: {
            name: productTypeName
        },
        include: {
            products: true
        }
    })
    if (!res) {
        notFound()
    }

    return res;
}

type PageProps = {
    params: { name: string }
}


export default async function Page(props: PageProps) {

    const {
        params
    } = props

    const productType = await getCategory(params.name)

    return (
        <div>
            <h1>
                {
                    productType.name
                }
            </h1>
            {productType.products.map(value => {
                return <h2
                    key={value.id}
                >{value.name}</h2>
            })}
        </div>
    );
};

export async function generateStaticParams() {

    console.log('------GENERATE PRODUCTTYPE ROUTES')
    const productType = await prisma.productType.findMany()

    return productType.map((value) => ({
        name: value.name,
    }));
}