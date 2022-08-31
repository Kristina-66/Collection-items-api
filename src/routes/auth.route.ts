import express from "express";
import {
  loginHandler,
  registerHandler,
  logoutHandler,
} from "../controllers/auth.controller";
import { validate } from "../middleware/validate";
import { createUserSchema, loginUserSchema } from "../schema/user.schema";
import { requireUser } from "../middleware/requireUser";
import { deserializeUser } from "../middleware/deserializeUser";

const router = express.Router();

router.post("/register", validate(createUserSchema), registerHandler);

router.post("/login", validate(loginUserSchema), loginHandler);

router.get("/logout", deserializeUser, requireUser, logoutHandler);

export default router;
