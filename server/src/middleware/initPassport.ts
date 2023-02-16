import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import google from '../config/passportConfig';
import session from 'cookie-session'
import dotenv from 'dotenv';

export const initPassport = (app: any) => {

    //not sure if this is needed
    // app.use(
    //     session({
    //       resave: false,
    //       saveUninitialized: true,
    //       secret: process.env.SECRET,
    //     })
    //   );

    //init passport
    app.use(passport.initialize());
    app.use(passport.session());
};

passport.use(
    new GoogleStrategy(google,
        async (accessToken: any, refreshToken: any, profile: any, done: any) => {
            console.log(profile);
            //done(err, user) will return the user we got from fb
            done(null, formatGoogle(profile._json));
        }
    )
);

passport.serializeUser((user: Express.User, done) => done(null, user));

passport.deserializeUser((user: Express.User, done) => done(null, user));

const formatGoogle = (profile: any) => {
    return {
        firstName: profile.given_name,
        lastName: profile.family_name,
        email: profile.emaiL
    };
};