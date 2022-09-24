import express from 'express'

import session from 'express-session'
import passport from 'passport'
import {Strategy}  from 'passport-local'
const LocalStrategy = Strategy


const app = express()

app.use(session({
    secret: 'HtbyR7QcrpWFDEfDQ',
    resave: true,
    saveUninitialized: true,
    cookie: { 
        maxAge:60000
    }
}))

passport.use(
    new LocalStrategy(
        {usernameField : 'email'},
        (username,password,done)=>{
        return done(null,{id:1,name:"hans"})
    })
)

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser(async(id,done)=>{
    done(null,{id:1,name:"hans"})
})


app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(passport.initialize())
app.use(passport.session())

app.post('/login_v2', passport.authenticate("local",{
    // successRedirect: '/correct',
    failureRedirect:"/login_error"
}), function(req, res) {
    res.json(req.user)
})

app.listen(4000)