import {PrismaClient} from '@prisma/client'


const prisma = new PrismaClient()


const ids = {
    laptops: '636643bf5f55c986de07b9bd',
    phones: '636ccd90cb0ef3e763d1227c',
    top: '636cce7fcb0ef3e763d12288',
    vinyl: '636cce81cb0ef3e763d12289',
    bottom: "636cce82cb0ef3e763d1228a",
    tabels: '636cce82cb0ef3e763d1228b',
    players: '636ccecbcb0ef3e763d12294'
}
const getIndex = (index: number): string => {
    if (index < 5) {
        return ids.laptops
    }
    if (index < 10) {
        return ids.phones
    }
    if (index < 15) {
        return ids.top
    }
    if (index < 20) {
        return ids.vinyl
    }
    if (index < 25) {
        return ids.bottom
    }
    if (index < 30) {
        return ids.tabels
    }
    if (index < 35) {
        return ids.players
    }
    return ids.players
}

async function main() {
    const products = await prisma.product.findMany()


    products.forEach(async (value, index) => {
        await prisma.product.update({
            where: {
                id: value.id
            }, data: {
                ProductTypeId: getIndex(index),

            }
        })
    })
}

main().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})