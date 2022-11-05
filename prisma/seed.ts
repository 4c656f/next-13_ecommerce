import {PrismaClient} from '@prisma/client'


const prisma = new PrismaClient()

async function main() {
    const productType = await prisma.product.update({
        where:{
            id: "6365509ee1a687c65ac4f2b4"
        },
        data: {
            ProductTypeId:"636643bf5f55c986de07b9bd"
        }
    })
    console.log(productType)
}

main().then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })