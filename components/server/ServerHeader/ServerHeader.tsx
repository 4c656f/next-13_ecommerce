import React from 'react';
import {Category, ProductType} from "@prisma/client";
import HeaderItem from "../../ui/HeaderItem/HeaderItem";
import HeaderSection from "../../ui/HeaderSection/HeaderSection";
import Button from "../../ui/Button/Button";
import ArrowIcon from "../../../materials/icons/arrow-left.svg";
import Link from "next/link";
import Header from "../../ui/Header/Header";
import classes from "./serverHeader.module.css";
import ToggleTheme from "~/components/client/toggleTheme/ToggleTheme";
import HeaderCart from "~/components/client/HeaderCart/HeaderCart";
import {prisma} from "~/utils/prisma";


type CategoryInclude = Category & { productTypes: ProductType[] }

type ServerHeaderProps = {
    // categories : CategoryInclude[]
}
export const revalidate = 3600

async function getCategories() {

    const res = await prisma.category.findMany({
        include: {
            productTypes: true,
        }
    })

    return res;
}


export default async function ServerHeader(props: ServerHeaderProps) {

    const {} = props


    const categories = await getCategories()

    return (
        <div
            className={classes.header_container}
        >
            <Header
                logoSection={<Link className={classes.logo_href} href={'/'}><h1>Logo</h1></Link>}
                mainSection={
                    [<HeaderItem title={"Categories"} key={'someKey'}>
                        <HeaderSection
                            sectionTitle={<h1>All categories</h1>}
                            headerSectionElems={
                                categories.map((value, index) => {
                                    return {
                                        title:
                                            <Button
                                                colorIndex={'1'}
                                                key={value.id}
                                                defaultIconStyles={true}
                                                icon={<ArrowIcon/>}
                                                size={'medium'}
                                                as={Link}
                                                href={`/categories/${value.name}`}
                                                variant={'link'}
                                                style={{width: '100%'}}
                                            >
                                                <h3>{value.name}</h3>
                                            </Button>,
                                        elements: value.productTypes.map((value, index) => {
                                            return (
                                                <Button
                                                    colorIndex={'1'}
                                                    key={value.id}
                                                    defaultIconStyles={true}
                                                    icon={<ArrowIcon/>}
                                                    as={Link}
                                                    href={`/products/${value.name}`}
                                                    variant={'link'}
                                                >{value.name}</Button>
                                            )
                                        })
                                    }
                                })

                            }
                        />
                    </HeaderItem>
                    ]}
                rightSection={[
                    <ToggleTheme
                        key={'someRandom'}
                    />,
                    <HeaderCart
                        key={'someRandom2'}
                    />
                ]}
            />
        </div>
    );
};
