import express from "express";
import {
  getAllUsersHandler,
  getMeHandler,
  updateStatusHandler,
  updateRoleHandler,
  deleteUsersHandler,
} from "../controllers/user.controller";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { restrictTo } from "../middleware/restrictTo";

const router = express.Router();
router.use(deserializeUser, requireUser);

// Admin Get Users route
router.get("/", restrictTo("admin"), getAllUsersHandler);

// Get my info route
router.get("/me", getMeHandler);

// Update status route
router.patch("/status", updateStatusHandler);

// Update role route
router.patch("/role", updateRoleHandler);

// Delete user route
router.delete("/", deleteUsersHandler);

export default router;
