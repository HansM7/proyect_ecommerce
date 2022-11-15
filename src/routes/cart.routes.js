import express from 'express'
import { createOneController, deleteOneProductCartController, getCartController, removeItemController } from '../controllers/cart.api.controllers.js'
import { isLogin } from '../middlewares/cart.middlewares.js'

const router = express.Router()

router.get('/add_cart/:id', isLogin, createOneController )
router.get('/cart/', isLogin,  getCartController )

router.get('/remove_item/:id', isLogin,  removeItemController) //Te elimina el item y te devuelve todo el stock


// router.get('/add_product/:id', isLogin,  addProductController) 
router.delete('/delete_product/:id', isLogin,  deleteOneProductCartController) 


export default router 