import 'dotenv/config' 
import express from 'express'

// PASSPORT IMPORTS 
import session from 'express-session'
import passport from 'passport'
import {Strategy}  from 'passport-local'

// IMPORTANDO RUTAS
import routerProduct from './src/routes/product.routes.js'
import routerUser from './src/routes/user.routes.js'
import routerCart from './src/routes/cart.routes.js'

// IMPORTANDO MODELOS
import Product from './src/service/product.service.js'
import User from './src/service/user.service.js'
import Cart from './src/service/cart.service.js'



// import {schema} from './setting-graphql.js'
// import { getProducts } from './setting-graphql.js'
// import { graphqlHTTP } from 'express-graphql'



const app = express()
const modelProduct=new Product()
const modelUser=new User()
const modelCart=new Cart()

const LocalStrategy = Strategy

app.use(session({
    secret: 'HtbyR7QcrpWFDEfDQ',
    resave: true,
    saveUninitialized: false
}))


// Configuracion de los arhivos vista
app.set('views', './src/view')
app.set('views engine', 'ejs')
app.use(express.static('./public'))

// Seteo de la data en json
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


passport.use(
    new LocalStrategy(
        {usernameField : 'email'},
        async (username,password,done)=>{
        const userBd = await modelUser.getForEmail(username)
        if (userBd) {
            return done(null,userBd)
        }
        return done(null,false)
        
    })
)

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser(async(id,done)=>{
    const user =  await modelUser.getById(id)
    done(null,user)
})

// CONFIGURACION DEL PASSPORT
app.use(passport.initialize())
app.use(passport.session())

// CONFIGURANDO GRAPHQL




app.get('/', async (req,res) => {
    if (req.user) {
        const dataProduct = await modelProduct.getMany()
        const dataCart = await modelCart.getCartForUser(req.user.id)
        const data= {
            dataProduct,
            login:true,
            user:req.user,
            dataCart
        }
        res.render('index.ejs',data)
    }else{
        const dataProduct = await modelProduct.getMany()
        const data= {
            dataProduct,
            login:false,
            user:{},
            dataCart:{}
        }
        res.render('index.ejs',data)
    }
    
}) 
app.get('/register', async (req,res) => {
    if (req.user) {
        res.redirect('/')
    }else{
        const data={
            login:false
        }
        res.render('register.ejs',data)
    }
    
}) 
app.get('/signin', async (req,res) => {

    if (req.user) {

        res.redirect('/')
    }else{
        const data={
            login:false,
            dataCart:{}
        }
        res.render('signin.ejs',data)
    }
    
}) 
app.get('/error_add_login', async (req,res) => {
    const data={
        login:false
    }
    res.render('error_add_login.ejs',data)
}) 

app.get('/chat', async (req,res) => {
    res.render('chat.ejs')
})



app.use('/', routerProduct)
app.use('/',routerUser)
app.use('/', routerCart)

app.get('/*', async (req,res)=>{
    res.status(404).send("Error 404")
})



export default app

// const io=new Server(myServer)

// instanceSockets(io)