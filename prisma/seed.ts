// import {PrismaClient} from '@prisma/client'
// import * as fs from 'node:fs/promises';
// import path from "node:path";
// import {exists} from "fs";
//
// const dir = '../public/productPics'
//
//
// const prisma = new PrismaClient()
// type resp = {
//     products: {
//         title: string
//     }[]
// }
// type JSONResponse = {
//     data: resp
//
// }
// const data = {
//     "products": [{"id": 1, "title": "iPhone 9"}, {"id": 2, "title": "iPhone X"}, {
//         "id": 3,
//         "title": "Samsung Universe 9"
//     }, {"id": 4, "title": "OPPOF19"}, {"id": 5, "title": "Huawei P30"}, {"id": 6, "title": "MacBook Pro"}, {
//         "id": 7,
//         "title": "Samsung Galaxy Book"
//     }, {"id": 8, "title": "Microsoft Surface Laptop 4"}, {"id": 9, "title": "Infinix INBOOK"}, {
//         "id": 10,
//         "title": "HP Pavilion 15-DK1056WM"
//     }, {"id": 11, "title": "perfume Oil"}, {"id": 12, "title": "Brown Perfume"}, {
//         "id": 13,
//         "title": "Fog Scent Xpressio Perfume"
//     }, {"id": 14, "title": "Non-Alcoholic Concentrated Perfume Oil"}, {
//         "id": 15,
//         "title": "Eau De Perfume Spray"
//     }, {"id": 16, "title": "Hyaluronic Acid Serum"}, {"id": 17, "title": "Tree Oil 30ml"}, {
//         "id": 18,
//         "title": "Oil Free Moisturizer 100ml"
//     }, {"id": 19, "title": "Skin Beauty Serum."}, {"id": 20, "title": "Freckle Treatment Cream- 15gm"}, {
//         "id": 21,
//         "title": "- Daal Masoor 500 grams"
//     }, {"id": 22, "title": "Elbow Macaroni - 400 gm"}, {"id": 23, "title": "Orange Essence Food Flavou"}, {
//         "id": 24,
//         "title": "cereals muesli fruit nuts"
//     }, {"id": 25, "title": "Gulab Powder 50 Gram"}, {"id": 26, "title": "Plant Hanger For Home"}, {
//         "id": 27,
//         "title": "Flying Wooden Bird"
//     }, {"id": 28, "title": "3D Embellishment Art Lamp"}, {"id": 29, "title": "Handcraft Chinese style"}, {
//         "id": 30,
//         "title": "Key Holder"
//     }, {"id": 31, "title": "Mornadi Velvet Bed"}, {"id": 32, "title": "Sofa for Coffe Cafe"}, {
//         "id": 33,
//         "title": "3 Tier Corner Shelves"
//     }, {"id": 34, "title": "Plastic Table"}, {"id": 35, "title": "3 DOOR PORTABLE"}, {
//         "id": 36,
//         "title": "Sleeve Shirt Womens"
//     }, {"id": 37, "title": "ank Tops for Womens/Girls"}, {"id": 38, "title": "sublimation plain kids tank"}, {
//         "id": 39,
//         "title": "Women Sweaters Wool"
//     }], "total": 100, "skip": 0, "limit": 39
// }
//
// async function main() {
//     // const readDir = await fs.readdir(path.join(__dirname, '/../public/productPics'), {})
//
//
//     // const array = data.products.map(value => {
//     //     return {name: value.title}
//     // }) as Array<{ name: string }>
//     //
//     // const productsCreate = await prisma.product.createMany({
//     //     data: array
//     // })
//
//     const imageData = await prisma.product.findMany()
//
//     const images = await prisma.image.findMany()
//
//     imageData.forEach( async (value, index)=>{
//
//         console.log(value, images[index])
//         await prisma.image.update({
//             where: {
//                 id: images[index]?.id
//             },
//             data: {
//                 productID: value.id
//             }
//         })
//     })
//     //
//     // const images = await prisma.image.updateMany({
//     //     data: imageData.map(value => {
//     //         return {productsID: value.id}
//     //     })
//     // })
//
//
// }
//
// main().then(async () => {
//     await prisma.$disconnect()
// })
//     .catch(async (e) => {
//         console.error(e)
//         await prisma.$disconnect()
//         process.exit(1)
//     })