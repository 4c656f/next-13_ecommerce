import {Prisma} from "@prisma/client";
import {AtMostOneOf} from "./IAtMostOne";
import {IModels} from "./IModelsEnum";


export type IPrismaMongoQueryEnum =
    { Product: Prisma.ProductFindManyArgs } |
    { Category: Prisma.CategoryFindManyArgs } |
    {
        Image: Prisma.ImageFindManyArgs
    } |
    {
        ProductType: Prisma.ProductTypeFindManyArgs
    } |
    {
        User: Prisma.UserFindManyArgs
    }

export type IPrismaMongoQueryEnum2 = {
    Product: Prisma.ProductFindManyArgs
    Category: Prisma.CategoryFindManyArgs
    Image: Prisma.ImageFindManyArgs
    ProductType: Prisma.ProductTypeFindManyArgs
    User: Prisma.UserFindManyArgs

}

type Models = AtMostOneOf<{[k in keyof typeof Prisma.ModelName]: IPrismaMongoQueryEnum2[`${k}`] }>

type query<K extends  IModels> = {
    model: K;
    where: IPrismaMongoQueryEnum2[K]['where']
    skip: number;
    select: number;


}
