import express, { Express } from "express";
import { deserialize } from "v8";
import {
  createCollectionHandler,
  deleteCollectionsHandler,
  getAllCollectionsHandler,
  getCollectionHandler,
  updateCollectionsHandler,
} from "../controllers/collections.controller";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { validate } from "../middleware/validate";
import { createCollectionSchema } from "../schema/collections.schema";

const router = express.Router();
router.use(deserializeUser, requireUser);

router.post("/", validate(createCollectionSchema), createCollectionHandler);

router.delete("/", deleteCollectionsHandler);

router.patch("/update", updateCollectionsHandler);

router.get("/:id", getCollectionHandler);

router.get("/", getAllCollectionsHandler);

export default router;
