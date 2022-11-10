import React, {ReactNode} from 'react';
import ServerHeader from "../../components/server/ServerHeader/ServerHeader";
import {prisma} from "~/utils/prisma";

type ProductIndexLayoutProps = {
    children: ReactNode
}

export const revalidate = 3600

async function getCategories() {

    const res = await prisma.category.findMany({
        include: {
            productTypes: true
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

