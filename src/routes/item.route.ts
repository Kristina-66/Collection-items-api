import express, { Express } from "express";
import {
  createItemHandler,
  deleteItemsHandler,
  getAllItemsInCollectionHandler,
  getItemHandler,
  updateItemHandler,
} from "../controllers/item.controller";
import { validate } from "../middleware/validate";
import { createItemSchema } from "../schema/item.schema";

const router = express.Router();

router.post("/", validate(createItemSchema), createItemHandler);

router.delete("/", deleteItemsHandler);

router.patch("/update", updateItemHandler);

router.get("/:id", getAllItemsInCollectionHandler);

router.get("/:id", getItemHandler);

export default router;
