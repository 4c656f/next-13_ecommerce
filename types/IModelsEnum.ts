import { PrismaClient, Prisma } from '@prisma/client'
import {AtMostOneOf} from "./IAtMostOne";



export type IModels = (typeof Prisma.ModelName)[keyof typeof Prisma.ModelName]

export type IModelsKeys = 'user'|'product'|'productType'|'category'|'image'