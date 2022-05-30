import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";
import UsersController from "../controllers/UsersController";

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post(
  "/login",
  celebrate({
    [Segments.BODY]: {
      username: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.login
);

usersRouter.post(
  "/register",
  celebrate(
    {
      [Segments.BODY]: {
        username: Joi.string().required(),
        password: Joi.string().required(),
      },
    },
    { abortEarly: false, stripUnknown: true, allowUnknown: false }
  ),
  usersController.create
);
usersRouter.get("/list", usersController.index);

usersRouter.get("/:id", usersController.show);

usersRouter.put(
  "/:id",
  celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        old_password: Joi.string(),
        password: Joi.string().optional(),
        password_confirmation: Joi.string()
          .valid(Joi.ref("password"))
          .when("password", {
            is: Joi.exist(),
            then: Joi.required(),
          }),
      },
    },
    { abortEarly: false, stripUnknown: true, allowUnknown: false }
  ),
  usersController.update
);

export default usersRouter;
