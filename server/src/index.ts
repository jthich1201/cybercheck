import express, { Express, Request, Response } from 'express';
import passport from 'passport';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(express.json());

// Initialize Passport
app.use(passport.initialize());

const ssoRoutes = require("./routes/ssoRoutes");

app.use('/', ssoRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send({data: 'cyber CHECK'});
});

const userRoute = require("./routes/User");
const commentsRoute = require("./routes/Comments");

app.use('/Users', userRoute);
app.use('/Comments', commentsRoute);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});