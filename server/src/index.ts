import express, { Express, Request, Response } from 'express';
import passport from 'passport';
import dotenv from 'dotenv';
import { userTable } from './db/Create-Tables';
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());

// Initialize Passport
app.use(passport.initialize());

app.get('/', (req: Request, res: Response) => {
  res.send({ data: 'cyber CHECK' });
});

const userRoute = require("./routes/userRoutes");
const commentsRoute = require("./routes/Comments");
const descriptionsRoute = require("./routes/Descriptions");
const reportRoute = require("./routes/reportRoutes")
const promptRoute = require("./routes/promptRoutes");

app.use('/Users', userRoute);
app.use("/api/comments", commentsRoute);
app.use("/api/descriptions", descriptionsRoute);
app.use('/Reports', reportRoute);
app.use('/Prompts', promptRoute);


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
userTable()
