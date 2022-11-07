import {IModels} from "./IModelsEnum";
import {Prisma} from '@prisma/client'
import {IPrismaMongoQueryEnum} from "./IPrismaMongoQueryEnum";

type CustomPrisma = typeof Prisma

export type IGetModelQuery = {
    model: IModels;
    query?: IPrismaMongoQueryEnum
}

const obj:IGetModelQuery = {
    model: 'Image',

}
