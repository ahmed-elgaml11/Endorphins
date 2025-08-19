import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import db from '../models/index.js'
const { User } = db

const customFields = {
    usernameField: 'phone',
    passwordField: 'password',
};

const verifyCallback = async (phone, password, cb) => {
    try {

        const user = await User.findOne({ where: { phone } });
        if (!user) { return cb(null, false, { message: 'The user is not found, please signup first!.' }); }

        if (!user.validatePassword(password, user.password)) { return cb(null, false); }

        return cb(null, user);

    }
    catch (err) {
        return cb(err)
    }

}

const strategy = new LocalStrategy(customFields, verifyCallback)

passport.use(strategy)

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        done(null, user); // now req.user = user
    } catch (err) {
        done(err);
    }
});