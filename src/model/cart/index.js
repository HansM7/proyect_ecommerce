import {instanceConnection} from "../../config/database/index.js"
import {cartSchema} from "./cart.schema.js"
// import User from "../user/index.js"
import Product from "../product/index.js"

import mongoose from "mongoose"

const newSchema=mongoose.model('carts',cartSchema)
const  modelProduct=new Product()
// const modelUser = new User()

export default class Cart{

    async createId(){
        try {
            await instanceConnection()
            const allCarts=await newSchema.find({})
            const length_carts = allCarts.length
            const newId= length_carts +1
            const id = ""+newId
            return id
        } catch (error) {
            console.log(error)
        }
    }

    async getMany(){
        try {
            await instanceConnection()
            const carts = await newSchema.find()
            return carts
        } catch (error) {
            console.log(error)
        }
    }

    async getOne(id){
        try {
            await instanceConnection()
            const cart = await newSchema.findOne({id})
            return cart
        } catch (error) {
            
        }
    }

    async getCartActive(idUser){
        try {
            await instanceConnection()
            const cart = await newSchema.findOne({user_id:idUser,state: 'ACTIVE'})
            return cart.id
            
        } catch (error) {
            console.log(error)
        }
    }
    
    async addToCart(data){
        try {
            // Condicion, si existe, agregar la cantidad
            await instanceConnection()

            const id = await this.getCartActive(data.idUser)
            
            const product = await modelProduct.getOne(data.idProduct)

            const newProduct={
                id:product.id,
                ammount: 1,
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail,
                description: product.description
            }

            const cart = await this.getOne(id)

            const products=cart.products

            let iteration=0

            products.find(product => {
                if (product.id === data.idProduct) {
                    iteration++
                }
            })

            if (iteration>0) {
                await newSchema.updateOne({$and:[{id},{"products.id":data.idProduct}]},{$inc:{"products.$.ammount":+1}})
                await modelProduct.reduceStock(data.idProduct,1)
                return {
                    channel:1,
                    state:"success",
                    message:"registered successfully"
                }
            }else{
                await newSchema.updateOne({id},{$addToSet:{"products":newProduct}})
                await modelProduct.reduceStock(data.idProduct,1)
                return {
                    channel:2,
                    state:"success",
                    message:"registered successfully"
                }
            }

        } catch (error) {
            console.log(error)
        }
        
    }

    async createCartAndAddToCart(data){
        try {
            await instanceConnection()
            const idCart = await this.createId()
            const id = data.idProduct
            const user_id=data.idUser

            const product = await modelProduct.getOne(id)

            const newProduct={
                id,
                ammount: 1,
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail,
                description: product.description
            }
            const register={
                id:idCart,
                user_id,
                products:[newProduct],
                state:"ACTIVE",
                timestamp: Date.now()
            }
            await newSchema.create(register)

            await modelProduct.reduceStock(id,1)

            return product
            
        }catch (error) {
            console.log(error)
        }
    }

    async getForActive(idUser){
        try {
            await instanceConnection()
            const userCart= await newSchema.findOne({idUser})
            if (userCart) {
                if(userCart.state==="ACTIVE"){
                    return {
                        level:1
                    }
                }else{
                    return {
                        level:0
                    }
                }
            }else{
                return {
                    level:0
                }
            }

        } catch (error) {
            console.log(error)
        }
    }

    async getCartForUser(idUser){
        try {
            await instanceConnection()
            const cart = await newSchema.findOne({user_id:idUser,state: 'ACTIVE'})
            const data ={
                cart,
                length_products:cart.products.length
            }
            return data
        } catch (error) {
            console.log(error)
        }
    }

    async removeItem(idProduct,idUser){
        try {
            await instanceConnection()
            const id = await this.getCartActive(idUser)
            const cart = await this.getOne(id)
            const productsCart=cart.products
            const product = productsCart.find(i=>{
                if (i.id===idProduct) {
                    return i
                }
            })
            const ammount = product.ammount
            await modelProduct.increaseStock(idProduct,ammount)

            await newSchema.updateOne({id},{$pull:{products:{id:idProduct}}})
        } catch (error) {
            console.log(error)
        }
    }

    async deleteOneProductCartController(data){
        try {
            await instanceConnection()

            const id = await this.getCartActive(data.idUser)

            // Bucle para detectar si tiene 0 o no

            const dataProduct = await newSchema.findOne({$and:[{id},{"products.id":data.idProduct}]})

            const productAmmount=dataProduct.products[0].ammount

            if (productAmmount>0) {
                await newSchema.updateOne({$and:[{id},{"products.id":data.idProduct}]},{$inc:{"products.$.ammount":-1}})
                await modelProduct.increaseStock(data.idProduct,1)
                return {
                    channel:1,
                    state:"success",
                    message:"registered successfully"
                }
            }else{
                await this.removeItem(data.idProduct,data.idUser)
                return {
                    channel:1,
                    state:"success",
                    message:"registered successfully"
                }
            }

                

        } catch (error) {
            console.log(error)
        }
    }


}