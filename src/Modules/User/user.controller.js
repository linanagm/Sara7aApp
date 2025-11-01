import { Router } from "express";
import * as userService from "./user.service.js";
import { authenticationMiddleware } from "../../Middlewares/authentication.middleware.js";

const router = Router();

router.get("/getProfile" , authenticationMiddleware ,userService.getSingleUser);

export default router;