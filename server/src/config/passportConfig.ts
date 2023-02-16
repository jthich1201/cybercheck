import dotenv from 'dotenv';
import { StrategyOptionsWithRequest } from 'passport-google-oauth20';

export const google: StrategyOptionsWithRequest = {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: 'http://localhost:3001/user/login/google/callback',
    passReqToCallback: true
}

export default google;