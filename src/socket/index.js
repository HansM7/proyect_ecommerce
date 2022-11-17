import "dotenv/config"
import  Chat  from "../service/chat.service.js"
import fetch from "node-fetch"
const newChat = new Chat()

export const sock = (io) => {

    io.on('connection', (socket) => {

        // AL INGRESAR QUE SE CARGUEN TODOS LOS MENSAJES FETCH

        const applyMessage = async()=>{
            socket.emit("applyMessage", "Solicitando acceso")
        }
        applyMessage()


        socket.on("captureMessage", async(data)=>{
            const id=data.idUser[0]
            const res = await newChat.existsMessage(id)
            if(res.length>0){
                const messages = await newChat.getMessages(id)
                socket.emit("resMessage", messages)
            }
            
        })


        socket.on("addMessage", async(data)=>{
            const id=data.idUser
            const messages = await newChat.getMessages(id)
            io.emit("resMessage", messages)
        })

        socket.on("resAdminInstant",async(data)=>{
            const id=data.idUser
            await newChat.resMessageAdminInstant(id)
            const messages = await newChat.getMessages(id)
            io.emit("resMessage", messages)
        })

    })

}