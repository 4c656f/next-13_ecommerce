import React, {FC, ReactNode} from 'react';
import classes from '../page.module.css'
import HeaderItem from "../components/ui/HeaderItem/HeaderItem";
import HeaderSection from "../components/ui/HeaderSection/HeaderSection";
import Header from "../components/ui/Header/Header";
import ServerHeader from "../components/Header/ServerHeader";
import {PrismaClient} from "@prisma/client";

type ProductIndexLayoutProps = {
    children: ReactNode
}

export const revalidate = false

async function getCategories() {
    const prisma = new PrismaClient
    const res = await prisma.category.findMany({
        include:{
            productType:true
        }
    })

    return res;
}

export default async function ProductIndexLayout (props:ProductIndexLayoutProps) {

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

