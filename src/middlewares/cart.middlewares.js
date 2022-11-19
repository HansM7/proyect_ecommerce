import "dotenv/config"
import { createTransport } from 'nodemailer'
import User from '../service/user.service.js'
import Cart from '../service/cart.service.js'
const modelUser= new User()
const modelCart = new Cart()

export const isLogin= async(req,res,next)=>{
    try {
        if (req.user) {
            next()
        }else{
            res.redirect('/error_add_login')
        }
    } catch (error) {
        console.log(error)   
    }
}


export const sendOrder = async(req, res, next) =>{
    try {

        const dataCart= await modelCart.getCartForUser(req.user.id)
        const ammount = await modelCart.sumCartAmmount(dataCart)

        const templateOrder = await modelCart.templateOrder(dataCart.cart.products)

        const email = req.user.email
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
            from:"Correo de verificación de compra",
            to:TEST_MAIL,
            subject:"Orden de compra",
            text:"Este es el detalle de orden de compra",
            html:`
            <div style="min-width:600px; border:1px solid gray; border-radius:5px; padding:20px">
                <div style="width: 100%;">
                    <h3 style="font-weight: bold; margin: auto; color:brown;">TIENDA TECNOLOGICA</h3>
                </div>
                <table style="width: 100%;border-collapse:collapse" border="1">
                    <thead>
                        <tr>
                            <th align='left'>DESCRIPCION</th>
                            <th align='left'>CANTIDAD</th>
                            <th align='left'>PRECIO</th>
                            <th align='left'>SUBTOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${templateOrder}
                        <tr style="background:color: gray">
                            <td colspan="3" align="rigth"><strong>Total:</strong></td>
                            <td ><strong>${ammount}</strong></td>
                        </tr>
                    </tbody>
                </table>
                <br>
                <hr>
                <br>
                <a href="http://localhost:3000/confirm_order" style="background-color: #0d6efd; color:white; border-radius:2px; padding:5px; text-decoration: none">Confirmar compra</a>
            </div>
        
            `
        }

        await transporter.sendMail(emailContent)

        setTimeout(() => {
            res.redirect('/cart')
        }, 6000);


    } catch (error) {
        console.log(error)
    }
}