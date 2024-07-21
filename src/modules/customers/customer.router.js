import { Router } from "express";
import { signup, login } from "./customer.controller.js";

const customerRouter = Router()

customerRouter.post("/signup", signup)
customerRouter.post("/login", login)

export default customerRouter;
