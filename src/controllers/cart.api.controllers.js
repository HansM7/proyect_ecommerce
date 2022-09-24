
import Cart from "../model/cart/index.js"
import Product from "../model/product/index.js"
const modelCart = new Cart()
const modelProduct = new Product()


export const createOneController =async(req,res)=>{
    const idUser=req.user.id
    const idProduct = req.params.id
    const data={
        idUser,
        idProduct
    }

    const active = await modelCart.getForActive(idUser)

    if(active.level===1){
        const register = await modelCart.addToCart(data)
        res.redirect('/store')

    }else if(active.level===0){
        const register = await modelCart.createCartAndAddToCart(data)
        res.redirect('/store')
    }
}

export const getCartController = async (req,res)=>{
    if (req.user) {
        const dataCart = await modelCart.getCartForUser(req.user.id)
        const data= {
            login:true,
            user:req.user,
            dataCart
        }
        res.render('cart.ejs',data)
    }else{
        res.redirect('/error_add_login')
    }
}

export const addIemController = async (req,res)=>{
    if (req.user) {
        
    }else{
        res.redirect('/error_add_login')
    }
}

export const removeItemController = async (req,res)=>{
    const idProduct = req.params.id
    if (req.user) {
        await modelCart.removeItem(idProduct,req.user.id)
        res.redirect('/cart')
    }else{
        res.redirect('/error_add_login')
    }
}