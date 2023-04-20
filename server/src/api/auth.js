const passport = require('passport')
const jwt = require('jsonwebtoken')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')

passport.serializeUser((user, cb) => {
    console.log({user})
    cb(null, user)
})

passport.deserializeUser((obj, cb) => {
    cb(null, obj)
})

const auth = (api, config) => {
    api.use(passport.initialize())
    const jwtOptions = {
        secretOrKey: config.jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    passport.use(new JwtStrategy(jwtOptions, (payload, done) => {
        // Check if the token is valid and retrieve the user object from the database or session
        return done(null, payload.userId)
    }))

    const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
    passport.use(
        new GoogleStrategy(
            {
                clientID: config.google.clientID,
                clientSecret: config.google.clientSecret,
                callbackURL: config.google.callbackURL
            },
            (accessToken, refreshToken, profile, done) => {
                const run = async () => {
                    done(null, profile.id)
                }

                run()
            }
        ))

    api.get('/auth/google',
        passport.authenticate('google', { scope: ['profile', 'email'] }))

    api.get('/auth/google/callback',
        passport.authenticate('google', { session: false }),
        (req, res) => {
            const token = jwt.sign({ userId: req.user }, config.jwtSecret, { expiresIn: '24h' })
            res.redirect(config.frontendCallbackUrl + `?token=${token}`)
        })

    return passport    
}

module.exports = {
    auth
}