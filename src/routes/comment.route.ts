import {
  createItemCommentHandler,
  deleteItemCommentHandler,
} from "./../controllers/comments.controller";
import express from "express";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import multer from "multer";
const upload = multer();

const router = express.Router();

router.use(deserializeUser, requireUser);

router.post("/:id", upload.any(), createItemCommentHandler);

router.delete("/:id", deleteItemCommentHandler);

export default router;
