import { Router } from "express";
import { loginRecruiter, registerRecruiter } from "./recruiterController";
import { userInputValidators, loginInputValidators } from "../middlewares/validators/userValidator";
import { inputCheckErrorsMiddleware } from "../middlewares/inputCheckErrorsMiddleware";
export const recruiterRouter = Router()

recruiterRouter.post('/register', userInputValidators, inputCheckErrorsMiddleware, registerRecruiter)
recruiterRouter.post('/login', loginInputValidators, inputCheckErrorsMiddleware, loginRecruiter)