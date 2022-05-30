import transactionRouter from '@modules/transactions/routes/transactions.routes';
import userReleaseRouter from '@modules/userReleases/routes/userRealeases.routes';
import usersRouter from "@modules/users/routes/users.routes";
import { Router } from "express";

const routes = Router();
// routes.use('/password', passwordRouter);
// routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/releases', userReleaseRouter);
routes.use('/transaction', transactionRouter);
// routes.use('/customers', customersRouter);
// routes.use('/orders', orderRouter);
routes.use('/status',(req,res)=>{
  return res.status(200).json({
    domain: process.env.DOMAIN,
    enviroment: process.env.ENVIROMENT,
    version: process.env.VERSION,
    database: process.env.database_status
  })
});

export default routes;
