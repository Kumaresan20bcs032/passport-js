import express from 'express'
import env from 'dotenv'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import * as passportLocal from '../passport-js/passport-local'
env.config()
//initializing expresss.Router from constant variable router
const router = express.Router()
//serializing userName and setted to session 
passport.serializeUser((user, done) => {
    process.nextTick(() => {
        return done(null, user)
    })
})
//deserializing userName and setted to request
passport.deserializeUser((user, done) => {
    process.nextTick(() => {
        return done(null, user)
    })
})
//validating passport-local middleware
passport.use(new LocalStrategy(
    (username, password, done) => {
        done(null, { 'userName': username })
    }
))


//@POST
router.post('/passport-local', passport.authenticate('local', { failureRedirect: '/api/passport/failure' }),
    function (req, res) {
        res.redirect('/api/passport/success');
    })

//validating passport-google Oauth20
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:4000/api/passport/auth/google/callback",
    passReqToCallback: true
},
    (request, accessToken, refreshToken, profile, done) => {
        done(null, profile)
    }
));

//@GET
router.get('/success', passportLocal.successLogin)
router.get('/failure', passportLocal.failureLogin)
router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }))
router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/api/passport/success',
    failureRedirect: '/api/passport/failure'
}))


//@PUT

//@DELETE

//exporting router file for index.js
export default router