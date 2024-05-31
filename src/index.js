import express from 'express'
import env from 'dotenv'
import session from 'express-session'
import passport from 'passport'
import mainRouter from './routes/passport-route'
//configuring environment settings
env.config()
//initializing express framework for constant variable app
const app = express()

//using middleware for all routes
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
//setting session for app
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
//setting passport to access session
app.use(passport.initialize())
app.use(passport.session())
app.use('/api/passport', mainRouter)

//starting server-instance to listen port 4000
app.listen(process.env.PORT, () => {
    console.log(`Server Started at Port:${process.env.PORT}`)
})