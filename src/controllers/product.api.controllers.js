import Product from "../service/product.service.js"
import Cart from "../service/cart.service.js"

const modelProduct = new Product()
const modelCart = new Cart()

export const getManyController = async(req,res)=>{
    if (req.user) {
        const dataProduct = await modelProduct.getMany()
        let dataCart = await modelCart.getCartForUser(req.user.id)
        if(!dataCart){
            dataCart=[]
        }
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
    const dataProduct = await modelProduct.getOne(id)

    if (req.user) {
        let dataCart = await modelCart.getCartForUser(req.user.id)
        if(!dataCart){
            dataCart={}
        }
        const dataVerify=await modelProduct.compareProductCart(dataProduct, dataCart)
        const data= {
            dataVerify,
            login:true,
            user:req.user,
            dataCart
        }
        res.render('product_detail.ejs',data)
    }else{
        const dataCart = {}
        const dataVerify=await modelProduct.compareProductCart(dataProduct, dataCart)
        const data= {
            dataVerify,
            login:false,
            user:{},
            dataCart:{}
        }
        res.render('product_detail.ejs',data)
    }

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

export const getForCategoryController = async (req,res)=>{
    if (req.user) {
        const category = req.params.category

        const dataProduct = await modelProduct.getForCategory(category)
        let dataCart = await modelCart.getCartForUser(req.user.id)
        if(!dataCart){
            dataCart=[]
        }
        const dataVerify=await modelProduct.compareProductCart(dataProduct, dataCart)
        const data= {
            dataVerify,
            login:true,
            user:req.user,
            dataCart
        }
        res.render('store.ejs',data)
    }else{
        const category = req.params.category

        const dataProduct = await modelProduct.getForCategory(category)
        const dataCart = {}
        const dataVerify=await modelProduct.compareProductCart(dataProduct, dataCart)

        const data= {
            dataVerify,
            login:false,
            user:{},
            dataCart:{}
        }
        res.render('store.ejs',data)
        // res.json(dataProduct)
    }
}