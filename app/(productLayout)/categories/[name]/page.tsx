import React, {FC} from 'react';
import {prisma} from "../../../../lib/prisma";
import {notFound} from "next/navigation";

type PageProps = {
    params: { name: string }
}

export const revalidate = 3600;
async function getCategory(categoryName:string) {

    const res = await prisma.category.findFirst({
        where:{
            name: categoryName
        },
        include:{
            productType:true
        }
    })
    if (!res){
        notFound()
    }

    return res;
}



export default async function Page(props:PageProps){

    const {
        params
    } = props

    const category = await getCategory(params.name)

    return (
        <div>
            <h1>
                {
                    category.name
                }
            </h1>
            {category.productType.map(value=>{
                return <h2
                    key={value.id}
                >{value.name}</h2>
            })}
        </div>
    );
};

export async function generateStaticParams() {


    console.log('------GENERATE CATEGORIES ROUTES')
    const categories = await prisma.category.findMany()

    return categories.map((value) => ({
        name: value.name,
    }));
}