import express from 'express'
import { confirmOrderController, createOneController, deleteOneProductCartController, getCartController, getOrderController, removeItemController } from '../controllers/cart.api.controllers.js'
import { isLogin, sendOrder } from '../middlewares/cart.middlewares.js'

const router = express.Router()

router.get('/add_cart/:id', isLogin, createOneController )
router.get('/cart/', isLogin,  getCartController )
router.get('/order_detail/', isLogin,  getOrderController )

router.get('/remove_item/:id', isLogin,  removeItemController) //Te elimina el item y te devuelve todo el stock


// router.get('/add_product/:id', isLogin,  addProductController) 
router.get('/delete_product/:id', isLogin,  deleteOneProductCartController) 

router.get('/checkout_order/', isLogin,  sendOrder)
router.get('/confirm_order/', isLogin,  confirmOrderController)
router.get('/pp/', (req,res)=>{
    res.render('confirm_order.ejs')
})

export default router 