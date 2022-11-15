import { Chat } from "../service/chat.service.js"
const newChat = new Chat()

export const sock = (io) => {

    io.on('connection', (socket) => {

        // AL RECARGAR LA PAGINA NO CARGAN TODOS LOS DATOS 
        const sendMessage = async (req,res)=>{
            // const products = await newProduct.getAll() no me funciona la llamada al modelo, no e recupera los datos
            // const messages = await newChat.getMessages(req.user)
            // const newProducts = await products.json()
            const user = "req.user"
            socket.emit("prueba", user)
        }
        sendMessage()

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