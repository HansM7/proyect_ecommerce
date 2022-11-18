
import Chat from "../service/chat.service.js"
import Cart from "../service/cart.service.js"
const modelChat = new Chat()
const modelCart = new Cart()

export const chatController=async(req,res)=>{
    if(req.user){
        let dataCart = await modelCart.getCartForUser(req.user.id)
        if(!dataCart){
            dataCart=[]
        }
        const data= {
            login:true,
            user:req.user,
            dataCart
        }
        res.render("chat.ejs", data)
    }else{
        res.render("error_add_login.ejs")
    }
    
}

export const getMessageController= async(req,res)=>{
    const id = req.user.id
    const dataMessage = await modelChat.getMessages(id)
    res.json(dataMessage)
}

export const sendMessageController= async(req,res)=>{
    const data = req.body.message
    const register=await modelChat.createMessage(req.user,data)
    res.json(register)
}

