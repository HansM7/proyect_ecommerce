import {instanceConnection} from "../DAO/database/index.js"
import {userSchema} from "../model/user/user.schema.js"
import mongoose from "mongoose"

const newSchema=mongoose.model('users',userSchema)

export default class User{

    async createId(){
        try {
            await instanceConnection()
            const allUsers=await newSchema.find({})
            const length_products = allUsers.length
            const newId= length_products +1
            return newId
        } catch (error) {
            console.log(error)
        }
    }

    async updateVerifyUser(id){
        try {
            await instanceConnection()
            await newSchema.updateOne({id},{$set:{state_verify:'1'}})
        } catch (error) {
            console.log(error)
        }
    }

    async createCodeVerification(){
        try {
            await instanceConnection()
            const id = await this.createId()
            const currentTime = new Date();
            const year = currentTime.getFullYear()
            const code_verification = year+"-"+id
            return code_verification
        } catch (error) {
            console.log(error)
        }
    }

    async getForEmail(email) {
        try {
            await instanceConnection()
            const user = await newSchema.findOne({ email })
            return user
        } catch (error) {
            console.log(error)
        }
    }

    async getMany(){
        try {
            await instanceConnection()
            const user = await newSchema.find()
            return user
        } catch (error) {
            console.log(error)
        }
    }

    async getById(id){
        try {
            await instanceConnection()
            const user = await newSchema.find({id})
            return user[0]
        } catch (error) {
            
        }
    }
    
    async createOne(user){
        try {
            await instanceConnection()
            const id = await this.createId()
            const code_verify = await this.createCodeVerification()
            const name=user.name
            const lastname=user.lastname
            const email=user.email
            const password=user.password
            const direction=user.direction
            const age=user.age
            const number_phone=user.number_phone

            const newProduct={
                id,
                name,
                lastname,
                direction,
                email,
                password,
                age,
                number_phone,
                code_verify,
                timestamp:Date.now()
            }
            await newSchema.create(newProduct)
        } catch (error) {
            console.log(error)
        }
        
    }

    async deleteOne(id){
        try {
            await instanceConnection()
            await newSchema.deleteOne({"id":id})
            // return {
            //     res_proccess:true,
            //     message:"register deleted successfully"
            // }
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


}