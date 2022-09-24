import bcrypt from 'bcrypt'
import multer from 'multer'
import User from '../model/user/index.js'

// -----------------------------------------------------------------------
const modelUser=new User()


export const verifyPassword=async(req,res,next)=>{
    try {
        const {password,password_confirm}=req.body
        if (password===password_confirm) {
            next()
        }else{
            return res.json({
                state:"error",
                message:"The password is different of the initial password"
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export const encryptPassword=async(req,res,next)=>{
    try {
        const password = req.body.password
        const passHash = await bcrypt.hash(password, 5)

        req.password = passHash
        next()
    } catch (error) {
        console.log(error)
    }
}

const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: async(req,file,cb)=>{
        const id=await modelUser.createId()
        cb(null, "image"+id+".jpg")
    }
})

export const upload=multer({storage:storage})


export const verifyStateUser = async(req,res,next)=>{
    try {
        const state_verify = req.user.state_verify
        if (state_verify==="0") {
            const data={
                login: true,
                user: req.user,
                state_confirm:"",
                message_confirm:""
            }
            res.render('confirm_account.ejs',data)
            next()
        }else{
            res.send("Su cuenta fue confirmada")
        }
    } catch (error) {
        console.log(error)
    }
}

export const redirectCaseSession = (req, res, next)=>{
    if (req.user) {
        next()
    }else{
        res.redirect("/")
    }
}
