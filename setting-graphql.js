import Product from './src/service/product.service.js'
import { buildSchema } from 'graphql'

const modelProduct=new Product()

export const getProducts=async()=>{
    const data = await modelProduct.getMany()
    return data
}

export const schema=buildSchema(`

type Myproduct {
    id:String,
    title:String,
    tags:[String],
    description:String,
    price:Number,
    stock:Number,
    thumbnail:String,
    timestamp:Date
}

type Query {
    getProducts(): [Myproduct]
}

`)
