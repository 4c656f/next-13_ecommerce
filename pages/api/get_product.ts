// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {Prisma} from "@prisma/client";
import qs from 'qs'

type Data = {
    data: boolean
}
export type query = {
    skip?: string;
    take?: string;
    include?: [keyof Prisma.ProductInclude]
    where?: Prisma.ProductWhereInput
}
const obj: query = {}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const {
        query
    } = req


    if (req.url) {
        console.log(qs.parse(req.url))
    }


    // const data = await prisma.product.findMany({
    //     skip: Number(skip),
    //     take: Number(take),
    //
    //     where:{
    //         ...where
    //     },
    //
    //     include:include?.reduce((prev, val)=>{
    //         prev[val] = true
    //         return prev
    //     },{} as any)
    // })

    res.status(200).json({data: true})
}
