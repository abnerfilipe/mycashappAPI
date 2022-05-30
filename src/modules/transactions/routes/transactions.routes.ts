
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import TransactionController from '../controllers/TransactionController';
import sController from '../controllers/TransactionController';

const transactionRouter = Router();
const controller = new TransactionController();

transactionRouter.get(
  '/list',
 controller.index);

transactionRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    }
  },{ abortEarly: false, stripUnknown: true, allowUnknown: false }),
  controller.show);
  
transactionRouter.post(
  '/user/:user/balance',
  celebrate({
    [Segments.BODY]: {
      date: Joi.date().required()
    },
  },{ abortEarly: false, stripUnknown: true, allowUnknown: false }),
  controller.balanceFromUser);

  transactionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      type: Joi.string().valid('p','r').required(),
      description: Joi.string().default(null),
      value: Joi.number().required(),
      user: Joi.string().required(),
    },
  },{ abortEarly: false, stripUnknown: true, allowUnknown: false }),
  controller.create);

  transactionRouter.patch(    
  '/:id/user/:user',
  celebrate({
    [Segments.BODY]: {
      type: Joi.string().valid('p','r'),
      description: Joi.string(),
      value: Joi.number(),
    }
  },{ abortEarly: false, stripUnknown: true, allowUnknown: false }),
  controller.update);


export default transactionRouter;
