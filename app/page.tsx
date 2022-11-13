import ServerHeader from "../components/server/ServerHeader/ServerHeader";
import {prisma} from "../utils/prisma";
import classes from './page.module.css'
import ProductScroll from "../components/client/productScroll/productScroll";

type HomeProps = {}


// export const revalidate = 3600


async function getProducts() {


    const res = await prisma.product.findMany({
        skip: 0,
        take: 10,
        include: {
            productType: {
                include: {
                    category: true
                }
            },
            image: true
        },
        orderBy: {
            price: 'asc'
        }
    })

    return res;
}

export default async function Home(props: HomeProps) {


    const products = await getProducts()


    return (
        <div
            className={classes.main_container}
        >
            {/*@ts-ignore*/}
            <ServerHeader

            />
            <ProductScroll initialProducts={products}/>
        </div>
    )
}
