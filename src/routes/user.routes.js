import express, { response } from "express"
import passport from "passport"
import { createOne, login, verifyCodeEmail } from "../controllers/user.api.controllers.js"
import { sendCodeVerification } from "../middlewares/user.email.middleware.js"
import { encryptPassword, verifyPassword,upload, verifyStateUser, redirectCaseSession } from "../middlewares/user.middlewares.js"


const router = express.Router()

router.get('/confirm_account', redirectCaseSession , verifyStateUser)

router.get('/logout',(req, res) => {
    req.session.destroy()
    res.redirect('/')
})

router.post('/user', 
    upload.single("file_image"),
    verifyPassword,
    encryptPassword,
    createOne,
    sendCodeVerification,
    passport.authenticate("local",{
        successRedirect: '/confirm_account',
        failureRedirect:"/login_error"
    })
)

router.post('/verify_code',verifyCodeEmail)

router.post('/login', login ,passport.authenticate("local",{
    successRedirect: '/',
    failureRedirect:"/error_login"
}))

router.get('/error_login',(req,res) => {
    res.render('error_login.ejs')
})


export default router