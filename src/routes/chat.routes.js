import express from 'express'
import { isLogin } from '../middlewares/cart.middlewares.js'

const router = express.Router()

router.get('/chat', isLogin, getMessageController )
router.post('/chat/', isLogin,  sendMessageController )

export default router 