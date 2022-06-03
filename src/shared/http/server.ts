import { errors } from 'celebrate';
import cors from 'cors';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import routes from './routes';
import { intializeDB } from '../database/index';


const app = express();

intializeDB();

app.use(cors());

app.use(morgan('dev'));

app.use(express.json({}));

app.use(express.static("public"))
// app.use(rateLimiter);

app.use(routes);

app.use(errors());

app.use((error: Error, req: Request,res: Response,next: NextFunction) => {
    return res.status(400).json({
      status: 'error',
      message: error.message
    })
})
app.listen(process.env.PORT || 5000, () => {
  console.log("\n\tServer started at: http://localhost:"+process.env.PORT)
  console.log("\tCheck status at: http://localhost:"+process.env.PORT+"/status")
})
