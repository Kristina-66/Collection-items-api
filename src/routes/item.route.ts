import express, { Express } from "express";
import { createItemHandler } from "../controllers/item.controller";
import { validate } from "../middleware/validate";
import { createItemSchema } from "../schema/item.schema";

const router = express.Router();

router.post("/", validate(createItemSchema), createItemHandler);

export default router;
