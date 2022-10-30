import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(express.json());


app.get('/', (req: Request, res: Response) => {
  res.send({data: 'cyber CHECK'});
});

const userRoute = require("./routes/User");
const reportRoute = require("./routes/Report");

app.use('/user', userRoute);
app.use('/report', reportRoute);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});