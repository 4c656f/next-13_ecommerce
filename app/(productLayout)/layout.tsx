import React, {ReactNode} from 'react';
import ServerHeader from "../components/ServerHeader/ServerHeader";
import {PrismaClient} from "@prisma/client";

type ProductIndexLayoutProps = {
    children: ReactNode
}

export const revalidate = false

async function getCategories() {
    const prisma = new PrismaClient
    const res = await prisma.category.findMany({
        include: {
            productType: true
        }
    })

    return res;
}

export default async function ProductIndexLayout(props: ProductIndexLayoutProps) {

    const {
        children
    } = props

    const categories = await getCategories()

    return (
        <>
            <ServerHeader
                categories={categories}
            />
            {children}
        </>
    );
};

