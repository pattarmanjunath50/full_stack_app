import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { Router }  from './routes/index';
import bodyParser from 'body-parser';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req: Request, res: Response, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

// Serve static files from the dist directory
// app.use('/', express.static(path.join(__dirname, 'dist/client')));

// Routes
app.use('/api', Router);
// Catch all other routes and return the index file
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client/index.html'));
// });
  
app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`);
});