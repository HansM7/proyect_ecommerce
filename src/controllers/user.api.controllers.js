import User from "../model/user/index.js"
import bcrypt from "bcrypt"

const modelUser = new User()

// export const getManyController = async(_req,res)=>{
//     const data = await modelProduct.getMany()
//     res.json(data)
// }

export const createOne = async(req,res,next)=>{
    try {
        const {name,lastname,direction,email,age,postal_code,phone_number}=req.body
        const password = req.password
        const user={name, lastname, direction, email, age, postal_code, password, phone_number}
        const register = await modelUser.createOne(user)
        next()
    } catch (error) {
        console.log(error)
    }
    
}

export const verifyCodeEmail = async(req,res)=>{
    try {
        const code = req.user.code_verify
        const codeFront=req.body.code

        if (codeFront===code){
            await modelUser.updateVerifyUser(req.user.id)
            res.redirect('/')
        }else{
            const data={
                login: true,
                user: req.user,
                state_confirm:false,
                message_confirm:"El código es incorrecto, vuelva a intentarlo"
            }
            
            res.redirect('/confirm_account',data)
        }
    } catch (error) {   
        console.log(error)
    }
}

export const login = async(req, res,next) =>{
    try {
        const {email, password} = req.body
        const user = await modelUser.getForEmail(email)
        if (user) {
            bcrypt.compare(password,user.password,(err,isMatch)=>{
                if(err) res.redirect('/error_login')
                if(isMatch) next()
                else res.redirect('/error_login')
            })
        }else{
            res.redirect('/error_login')
        }
    } catch (error) {
        console.log(error)
    }
}