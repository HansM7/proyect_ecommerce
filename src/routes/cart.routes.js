import express from 'express'
import { addIemController, createOneController, getCartController, removeItemController } from '../controllers/cart.api.controllers.js'
import { isLogin } from '../middlewares/cart.middlewares.js'

const router = express.Router()

router.get('/add_cart/:id', isLogin, createOneController )
router.get('/cart/', isLogin,  getCartController )
router.get('/add_item/:id', isLogin,  addIemController )
router.get('/remove_item/:id', isLogin,  removeItemController)

export default router 