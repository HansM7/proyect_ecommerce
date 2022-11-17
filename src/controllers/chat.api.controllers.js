
import Chat from "../service/chat.service.js"
import Cart from "../service/cart.service.js"
const modelChat = new Chat()
const modelCart = new Cart()

export const chatController=async(req,res)=>{
    if(req.user){
        const dataCart = await modelCart.getCartForUser(req.user.id)
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
    const registered = await modelChat.createMessage(req.user,data)
    console.log("mensaje desde el controlador")
    console.log(registered)
}
// export const createOneController =async(req,res)=>{
//     const idUser=req.user.id
//     const idProduct = req.params.id
//     const data={
//         idUser,
//         idProduct
//     }

//     const active = await modelCart.getForActive(idUser)

//     if(active.level===1){
//         const register = await modelCart.addToCart(data)
//         if (register.channel ===1) {
//             res.redirect('/cart')
//         }else{
//             res.redirect('/store')
//         }

//     }else if(active.level===0){
//         const register = await modelCart.createCartAndAddToCart(data)
//         res.redirect('/store')
//     }
// }

// export const getCartController = async (req,res)=>{
//     if (req.user) {
//         const dataCart = await modelCart.getCartForUser(req.user.id)
//         const data= {
//             login:true,
//             user:req.user,
//             dataCart
//         }
//         res.render('cart.ejs',data)
//     }else{
//         res.redirect('/error_add_login')
//     }
// }


// export const removeItemController = async (req,res)=>{
//     const idProduct = req.params.id
//     if (req.user) {
//         await modelCart.removeItem(idProduct,req.user.id)
//         res.redirect('/cart')
//     }else{
//         res.redirect('/error_add_login')
//     }
// }

// export const addOneProductCartController = async (req,res)=>{
//     if (req.user) {
        
//     }else{
//         res.redirect('/error_add_login')
//     }
// }
// export const deleteOneProductCartController = async (req,res)=>{
//     const idUser=req.user.id
//     const idProduct = req.params.id
//     const data={
//         idUser,
//         idProduct
//     }
//     if (req.user) {
//         const deleted = await modelCart.deleteOneProductCartController(data)
//         res.redirect('/cart')
//     }else{
//         res.redirect('/error_add_login')
//     }
// }