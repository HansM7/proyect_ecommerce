import {instanceConnection} from "../DAO/database/index.js"
import {productSchema} from "../model/product/product.schema.js"
import mongoose from "mongoose"

const newSchema=mongoose.model('products',productSchema)

export default class Product{

    async reduceStock(idProduct,ammount){
        try {
            await instanceConnection()
            await newSchema.updateOne({id:idProduct},{$inc:{"stock":-ammount}})
        } catch (error) {
            console.log(error)
        }
    }

    async increaseStock(idProduct,ammount){
        try {
            await instanceConnection()
            await newSchema.updateOne({id:idProduct},{$inc:{"stock":+ammount}})
        } catch (error) {
            console.log(error)
        }
    }

    async createId(){
        try {
            await instanceConnection()
            const allProducts=await newSchema.find({})
            const length_products = allProducts.length
            const newId= length_products +1
            return newId
        } catch (error) {
            console.log(error)
        }
    }

    async getMany(){
        try {
            await instanceConnection()
            const products=newSchema.find({})
            return products
        } catch (error) {
            console.log(error)
        }
    }

    async getOne(id){
        try {
            await instanceConnection()
            const product = await newSchema.findOne({id})
            return product
        } catch (error) {
            
        }
    }

    async getManyForTag(){
        try {
            await instanceConnection()
            return "Resultados por tags"
        } catch (error) {
            console.log(error)
        }
    }

    async createOne(product){
        try {
            await instanceConnection()
            const id = await this.createId()
            const {title,description,tags,price,thumbnail,stock}=product
            const newProduct={
                id,
                title,
                description,
                tags,
                price,
                thumbnail,
                stock,
                timestamp:Date.now()
            }
            await newSchema.create(newProduct)
            return newProduct
        } catch (error) {
            console.log(error)
        }
        
    }

    async deleteOne(id){
        try {
            await instanceConnection()
            await newSchema.deleteOne({"id":id})
            return {
                res_proccess:true,
                message:"register deleted successfully"
            }
        } catch (error) {
            console.log(error)
        }
    }

    async editOne(product,id){
        try {
            newSchema.updateOne({"id":id},{
                $set:{
                    "title":product.title,
                    "price":product.price,
                    "thumbnail":product.thumbnail
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    async compareProductCart(dataProduct, dataCart){
        try {
            const dataVerify=[]
            for (let i = 0; i < dataProduct.length; i++) {
                
                const product = dataProduct[i]
                const newProduct={}
                let res=0
                for (let j = 0; j < dataCart.length_products; j++) {
                    if (product.id===dataCart.cart.products[j].id) {
                        res+=1
                    }else{
                        res+=0
                    }
                }
                if(res>=1){
                    newProduct.product=product
                    newProduct.active_cart=true
                }else{
                    newProduct.product=product
                    newProduct.active_cart=false
                }
                dataVerify.push(newProduct)

            }
            return dataVerify
        } catch (error) {
            console.log(error)
        }
    }

    async getForCategory(category) {
        try {
            await instanceConnection()
            const products=await newSchema.find({})
            const dataSetForCategory=[]

            for(let i=0; i<products.length;i++){
                let contCategory=0
                let allTags =products[i].tags
                for( let x in allTags){
                    if( allTags[x] === category){
                        contCategory+=1
                    }
                }
                if(contCategory>0){
                    dataSetForCategory.push(products[i])
                }

            }
            return dataSetForCategory

        } catch (error) {
            console.log(error)
        }
    }


}