import React from 'react';
import {prisma} from "~/utils/prisma";

type ProductHeadProps = {
    params: { link: string }
}

async function getProduct(productLink: string) {

    const res = await prisma.product.findUnique({
        where: {
            link: productLink
        }
    })


    return res;
}

const ProductHead = async (props: ProductHeadProps) => {

    const {
        params
    } = props


    const product = await getProduct(params.link)

    return (
        <>
            <title>
                {product
                    ?
                    product.name
                    : 'productPage'
                }
            </title>
        </>
    );
};

export default ProductHead;