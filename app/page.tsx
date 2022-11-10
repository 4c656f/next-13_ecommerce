import ServerHeader from "../components/server/ServerHeader/ServerHeader";
import {prisma} from "../utils/prisma";
import ProductCard from "../components/server/productCard/ProductCard";
import classes from './page.module.css'
import ProductScroll from "../components/client/productScroll/productScroll";
type HomeProps = {}


export const revalidate = 3600

async function getCategories() {

    const res = await prisma.category.findMany({
        include: {
            productTypes: true,
        }
    })

    return res;
}

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

    const categories = await getCategories()
    const products = await getProducts()

    return (
        <div
            className={classes.main_container}
        >

            <ServerHeader
                categories={categories}
            />
            <ProductScroll initialProducts={products}/>
        </div>
    )
}
