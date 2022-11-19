import { createTransport } from 'nodemailer'
import User from '../service/user.service.js'
const modelUser= new User()

export const sendCodeVerification = async (req,res,next)=>{
    try {
        const email = req.body.email
        const userBd = await modelUser.getForEmail(email)
        const code_verification = userBd.code_verify
        const MAIL_ORIGIN="melchorhans@gmail.com"
        const TEST_MAIL=email
        const PASS_MAIL="ypmfzqekggueitcp"

        const transporter=createTransport({
            service:"gmail",
            port:587,
            auth:{
                user:MAIL_ORIGIN,
                pass:PASS_MAIL
            }
        })

        const emailContent={
            from:"Correo desde NodeJS",
            to:TEST_MAIL,
            subject:"Prueba de correo",
            text:"Hola mundo!",
            html:`
                <div>
                    <h1>Tu código es ${code_verification}</h1>
                </div>
            `
        }
        await transporter.sendMail(emailContent)
        // Iniciar la sesion
        next()
    } catch (error) {
        console.log(error)
    }
}

