import { errors } from 'celebrate';
import cors from 'cors';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import 'reflect-metadata';
import '../database';
import routes from './routes';

const app = express();

app.use(cors());

app.use(morgan('dev'));

app.use(express.json({}));

// app.use(rateLimiter);

app.use(routes);

app.use(errors());

app.use((error: Error, req: Request,res: Response,next: NextFunction) => {
    return res.status(400).json({
      status: 'error',
      message: error.message
    })
  // return res;
  // return res.status(400).json(error)
})
app.listen(process.env.API_PORT, () => {

  console.log("\n\tServer started at: http://localhost:"+process.env.API_PORT)
  console.log("\tCheck status at: http://localhost:"+process.env.API_PORT+"/status")
})