import {PrismaClient} from "@prisma/client";


const prisma = new PrismaClient()


async function main() {
    const alice = await prisma.product.create({
        data: {
            name: "someProduct",
        }
    })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })