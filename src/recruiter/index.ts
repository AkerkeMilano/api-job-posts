import { Router } from "express";
import { loginRecruiter, registerRecruiter } from "./recruiterController";

export const recruiterRouter = Router()

recruiterRouter.post('/register', registerRecruiter)
recruiterRouter.post('/login', loginRecruiter)