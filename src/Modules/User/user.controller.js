import { Router } from "express";
import * as userService from "./user.service.js";

const router = Router();

router.get("/getProfile" , userService.getSingleUser);

export default router;