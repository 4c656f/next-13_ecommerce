import ServerHeader from "./components/Header/ServerHeader";
import {PrismaClient} from "@prisma/client";
import {prisma} from "../prisma";

type HomeProps = {}


export const revalidate = 3600

async function getCategories() {

    const res = await prisma.category.findMany({
        include:{
            productType:true
        }
    })

    return res;
}

export default async function Home(props: HomeProps) {

    const categories = await getCategories()

    return (
        <>

            <ServerHeader
                categories={categories}
            />

        </>
    )
}
