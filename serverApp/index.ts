import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { Router }  from './routes/index';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.use((req: Request, res: Response, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
// Routes
app.use('/api', Router);


app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`);
});