import mongoose from "mongoose"
import {instanceConnection} from "../DAO/database/index.js"
import {chatSchema} from "../model/chat/chat.schema.js"

const newSchema=mongoose.model('chats',chatSchema)

export class Chat{

    async createId(){
        try {
            await instanceConnection()
            const allMessage=await newSchema.find({})
            const length_messages = allMessage.length
            const newId= length_messages +1
            const id = ""+newId
            return id
        } catch (error) {
            console.log(error)
        }
    }

    async getMessages(idUser){
        try {
            await instanceConnection()
            const messages = await newSchema.find({"user_id":id})
            return messages
        } catch (error) {
            console.log(error)
        }
    }

    async existsMessage(id){
        try {
            await instanceConnection()
            const messages = await newSchema.find({"user_id":id})
            return messages
        } catch (error) {
            
        }
    }


    async sendMessage(user, text){
        try {
            await instanceConnection()
            const id = await this.createId()
            
            const user_id=user.id
            const message={
                text,
                type_user:"usuario",
                time_stamp: Date.now()
            }
        
            const data ={
                id,
                user_id,
                message
            }

            // await newSchema.create(data) Esta por verse
        } catch (error) {
            
        }
    }

    async createMessage(user, text){
        try {
            await instanceConnection()
            const res = await this.existsMessage(user.id)
            if(res){
                await this.sendMessage(user,text)
                return {
                    state:"success",
                    message:"Registro existoso"
                }
            }else{
                const id = await this.createId()
                const user_id=user.id
                const message={
                    text,
                    type_user:"usuario",
                    time_stamp: Date.now()
                }
            
                const data ={
                    id,
                    user_id,
                    message
                }

                await newSchema.create(data)
            }
            
        } catch (error) {
            
        }
    }
}