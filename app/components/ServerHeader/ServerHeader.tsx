import React from 'react';
import {PrismaClient, Category, ProductType} from "@prisma/client";
import HeaderItem from "../ui/HeaderItem/HeaderItem";
import HeaderSection from "../ui/HeaderSection/HeaderSection";
import Button from "../ui/Button/Button";
import ArrowIcon from "../../../materials/icons/arrow-left.svg";
import Link from "next/link";
import Header from "../ui/Header/Header";
import classes from "./serverHeader.module.css";


type CategoryInclude = Category & {productType: ProductType[]}

type ServerHeaderProps = {
    categories : CategoryInclude[]
}

export default function ServerHeader(props: ServerHeaderProps) {

    const {
        categories
    } = props



    return (
        <div
            className={classes.header_container}
        >
            <Header
                logoSection={<h1>Logo</h1>}
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
                                        elements: value.productType.map((value, index) => {
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
                // rightSection={[
                //     <Button href={'/product/2'} as={Link}>Link</Button>
                // ]}
            />
        </div>
    );
};
