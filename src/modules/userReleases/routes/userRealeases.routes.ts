import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UserReleaseController from '../controllers/UserReleaseController';

const userReleaseRouter = Router();
const controller = new UserReleaseController();


userReleaseRouter.get('/list', controller.list);

userReleaseRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    }
  }),
  controller.show);

userReleaseRouter.get(
  '/list/transaction/:id/:date',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
      date: Joi.string().required(),
    }
  }),
  controller.listAllFromTransaction);

userReleaseRouter.get(
  '/list/user/:id/:date',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
      date: Joi.string().required(),
    }
  }),
  controller.listAllFromUser);

export default userReleaseRouter;
