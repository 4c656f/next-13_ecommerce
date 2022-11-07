import {Prisma, Product} from "@prisma/client";
import axios, {AxiosResponse} from "axios";
import {query} from "../pages/api/get_product";
import qs from 'qs'
type IGetProps = {
    skip?: string;
    take?: string;
    include?: [keyof Prisma.ProductInclude]
    where?: Prisma.ProductWhereInput
}



export class ProductService {

    static async getProduct(props:IGetProps):Promise<AxiosResponse<Product[]>>{
        const {
            skip,
            take,
            include,
            where,
        } = props
        console.log(where)
        const myParams = {
            skip,
            take,
            include,
            where
        }
        console.log()
        const products = await axios.get(`http://localhost:3000/api/get_product` + qs.stringify(props))

        return products

    }
}