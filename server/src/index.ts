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
const commentsRoute = require("./routes/comments");
const descriptionsRoute = require("./routes/descriptions");
const reportRoute = require("./routes/reportRoutes")
const promptRoute = require("./routes/promptRoutes");
const taskRoute = require("./routes/taskRoutes");
const orgRoute = require("./routes/OrgRoutes");

app.use('/Users', userRoute);
app.use("/api/comments", commentsRoute);
app.use("/api/descriptions", descriptionsRoute);
app.use('/Reports', reportRoute);
app.use('/Prompts', promptRoute);
app.use('/Tasks', taskRoute)
app.use('/Org', orgRoute);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
userTable()
