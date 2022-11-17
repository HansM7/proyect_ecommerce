import express from 'express'
import { chatController, getMessageController, sendMessageController } from '../controllers/chat.api.controllers.js'
import { isLogin } from '../middlewares/cart.middlewares.js'

const router = express.Router()

router.get('/messages', isLogin, getMessageController )

router.get('/chat', isLogin, chatController )

router.post('/chat', isLogin,  sendMessageController )

export default router 