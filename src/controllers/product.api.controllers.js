import Product from "../model/product/index.js"
import Cart from "../model/cart/index.js"

const modelProduct = new Product()
const modelCart = new Cart()

export const getManyController = async(req,res)=>{
    if (req.user) {
        const dataProduct = await modelProduct.getMany()
        const dataCart = await modelCart.getCartForUser(req.user.id)
        const dataVerify=await modelProduct.compareProductCart(dataProduct, dataCart)
        const data= {
            dataVerify,
            login:true,
            user:req.user,
            dataCart
        }
        res.render('store.ejs',data)
    }else{
        const dataProduct = await modelProduct.getMany()
        const dataCart = {}
        const dataVerify=await modelProduct.compareProductCart(dataProduct, dataCart)

        const data= {
            dataVerify,
            login:false,
            user:{},
            dataCart:{}
        }
        res.render('store.ejs',data)
    }
}
export const getOneController = async(req,res)=>{
    const id = req.params.id
    const data = await modelProduct.getOne(id)
    res.json(data)
}

export const createOneController = async (req,res)=>{
    const data = req.body
    const register = await modelProduct.createOne(data)
    res.json(register)
}

export const editOneController = async (req,res)=>{
    const id = req.params.id
    const data = req.body
    const edited = await modelProduct.editOne(data,id)
    res.json(edited)
}

export const deleteOneController = async (req,res)=>{
    const id = req.params.id
    const deleted = await modelProduct.deleteOne(id)
    res.json(deleted)
}
