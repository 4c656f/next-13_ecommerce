import {PrismaClient} from '@prisma/client'
import slugify from "slugify";


const prisma = new PrismaClient()



async function main(){
    const products = await prisma.product.findMany()


    products.forEach(async (value)=>{
        await prisma.product.update({
            where:{
                id: value.id
            },data:{
                price: Math.floor(Math.random() * (9999 - 100) + 100),
                link: slugify(value.name).toLowerCase()
            }
        })
    })
}

main().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)})