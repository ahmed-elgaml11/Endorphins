import express from "express";
import cros from 'cors'
import { rateLimit } from 'express-rate-limit'
import helmet from 'helmet'
import api from './routes/index.js'
import errorHandler from "./midllewares/errorHandler.js";
import { AppError } from './utils/appError.js'
import session from "express-session";
import SequelizeSession from "express-session-sequelize";
const SequelizeStore = SequelizeSession(session.Store);
import db from "./models/index.js";
import './config/passport-local.js'
import env from "./env.js";
import passport from 'passport'




const app = express();
const { sequelize } = db
const store = new SequelizeStore({
    db: sequelize,
    tableName: 'Sessions',
});

// to allow specific domain to access the api to avoid CORS
app.use(cros({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true
}))
// set security headers
app.use(helmet());
// limit body payload to prevent 'denial of service attack'
app.use(express.json({ limit: '20kb' }));
app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    }
}));
app.use(passport.initialize());
app.use(passport.session());


// rateLimitING 
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    message: 'too many requests from this IP, try again in 15 minutes'
})

app.use('/api', limiter)




app.get('/', (req, res) => {
    res.json({
        message: 'hello from the root'
    })
})
app.use('/api/v1', api)
app.all('/*anything', (req, res, next) => {
    next(new AppError(`Not Found - ${req.originalUrl}`, 404))
})
app.use(errorHandler)


export default app 