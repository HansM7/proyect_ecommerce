import express from "express"
import { 
    getManyController,
    createOneController, 
    getOneController, 
    editOneController, 
    deleteOneController,
    getForCategoryController
    } 
    from "../controllers/product.api.controllers.js"
import { isAdmin } from "../middlewares/product.middlewares.js"

const router = express.Router()

router.get('/store',getManyController)
router.get('/store/:category', getForCategoryController)


router.get('/product/:id',getOneController )

router.post('/product', 
isAdmin , 
createOneController)

router.put('/api/producto/:id', editOneController)

router.delete('/api/producto/:id', deleteOneController)




export default router