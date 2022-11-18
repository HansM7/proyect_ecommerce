import express from "express"

const router = express.Router()

router.get('/', async (req,res) => {
    if (req.user) {
        const dataProduct = await modelProduct.getMany()
        const data= {
            dataProduct,
            login:true,
            user:req.user
        }
        res.render('index.ejs',data)
    }else{
        const dataProduct = await modelProduct.getMany()
        const data= {
            dataProduct,
            login:false,
            user:{}
        }
        res.render('index.ejs',data)
    }
    
}) 

router.get("/error_meme", ()=>{
    res.render("error_meme.ejs")
})

export default router