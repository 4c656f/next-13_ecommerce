import ServerHeader from "./components/ServerHeader/ServerHeader";
import {prisma} from "../prisma";
import ProductCard from "./components/productCard/ProductCard";
import classes from './page.module.css'
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
            <div
                className={classes.products_container}
            >
                {
                    products.map(value => {
                        return (<ProductCard
                            key={value.id}
                            product={value}
                            productType={value.productType}
                            images={value.image}
                        />)
                    })
                }
            </div>
        </div>
    )
}
