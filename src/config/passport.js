const passport = require('passport');
const passportJwt = require('passport-jwt');
const service = require('../service/UserService');

const secret = process.env.SECRET_KEY;
const { Strategy, ExtractJwt } = passportJwt;

const params = {
    secretOrKey: secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const strategy = new Strategy(params, async (payload, done) => {
    const user = await service.findOne({ id: payload.id });
    try {
        if (user) {
            done(null, { ...payload });
        } else done(null, false);
    } catch (err) {
        done(err, false);
    }

})
passport.use(strategy);
exports.authenticate = () => passport.authenticate('jwt', { session: false })
