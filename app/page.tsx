import ServerHeader from "./components/ServerHeader/ServerHeader";
import {prisma} from "../lib/prisma";
import ProductCard from "./components/productCard/ProductCard";
import classes from './page.module.css'
import ProductScroll from "./components/productScroll/productScroll";
type HomeProps = {}


export const revalidate = 3600

async function getCategories() {

    const res = await prisma.category.findMany({
        include: {
            productType: true
        }
    })

    return res;
}

async function getProducts() {
    const res = await prisma.product.findMany({
        skip: 0,
        take: 10,
        include: {
            productType: true,
            image: true
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
