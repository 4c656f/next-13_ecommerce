import {Prisma} from '@prisma/client'


export type IModels = (typeof Prisma.ModelName)[keyof typeof Prisma.ModelName]

export type IModelsKeys = 'user' | 'product' | 'productType' | 'category' | 'image'