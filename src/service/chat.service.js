import mongoose from "mongoose"
import {instanceConnection} from "../DAO/database/index.js"
import {chatSchema} from "../model/chat/chat.schema.js"

const newSchema=mongoose.model('chats',chatSchema)

export default class Chat{

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
            const messagesobj = await newSchema.find({"user_id":idUser})
            const messages = messagesobj[0].message
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
            
            const id=user.id
            const message={
                text,
                type_user:"usuario",
                time_stamp: Date.now()
            }

            await newSchema.updateOne({"user_id":id},{$addToSet:{"message":message}})
        } catch (error) {
            console.log(error)
        }
    }

    async createMessage(user, text){
        try {
            await instanceConnection()
            const res = await this.existsMessage(user.id)
            if(res.length>0){
                await this.sendMessage(user,text)
                return {
                    state:"success",
                    message:"Registro existoso 1"
                }
            }else{
                const id = await this.createId()
                const user_id=user.id
                const message={ text, type_user:"usuario", time_stamp: Date.now() }
                const data ={ id, user_id, message }

                await newSchema.create(data)

                return {
                    state:"success",
                    message:"Registro existoso 2"
                }
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    async resMessageAdminInstant(id){
        try {
            await instanceConnection()
            
            const res = await this.existsMessage(id)
            const messageObj=res[0].message
            if(messageObj.length<=1){
                const messageAdmin="Hola, gracias por escribirnos, dentro de un momento uno de nuestros asesores tomará su pedido."
                const message={
                    text:messageAdmin,
                    type_user:"administrador",
                    time_stamp: Date.now()
                }

                await newSchema.updateOne({"user_id":id},{$addToSet:{"message":message}})
            }
        } catch (error) {
            console.log(error)
        }
    }
}