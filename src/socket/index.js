import "dotenv/config"
import  Chat  from "../service/chat.service.js"
import fetch from "node-fetch"
const newChat = new Chat()

export const sock = (io) => {

    io.on('connection', (socket) => {

        // AL INGRESAR QUE SE CARGUEN TODOS LOS MENSAJES FETCH

        const sendMessage = async ()=>{
            const messages = await fetch(process.env.API_CHAT)
            socket.emit("captureMessages", messages)
            console.log(messages)
        }
        sendMessage()


        socket.on("addMessage", async(data)=>{
            console.log(data)
            sendMessage()
        })










        // // AL RECARGAR LA PAGINA NO CARGAN TODOS LOS DATOS 
        // const sendMessages = async()=>{
        //     // const messages = await newChat.getAll() no me funciona la llamada al modelo, no e recupera los datos
        //     const messages = await fetch("http://localhost:3000/messages")
        //     const newMessages = await messages.json()

        //     socket.emit("allMessagesServer", newMessages)
        // }
        // sendMessages()

        // socket.on('processAddProduct', async (data) => {
        //     console.log(data)

        //     const data2 = await fetch("http://localhost:3000/productos")
        //     const newdata = await data2.json()

        //     io.emit("allProductsServer", newdata)

        // })

        // socket.on('processAddMessage', async (data) => {
        //     console.log(data)

        //     const data3 = await fetch("http://localhost:3000/messages")
        //     const newdata2 = await data3.json()

        //     io.emit("allMessagesServer", newdata2)
            

        // })

        // console.log('Un usuario se a conectado')

    })

}