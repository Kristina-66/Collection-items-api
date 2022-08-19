import express, { Express } from "express";
import { createCollectionHandler, deleteCollectionsHandler, updateCollectionsHandler } from "../controllers/collections.controller";
import { validate } from "../middleware/validate";
import { createCollectionSchema } from "../schema/collections.schema";

const router = express.Router();

router.post("/", validate(createCollectionSchema), createCollectionHandler);

router.delete('/', deleteCollectionsHandler);

router.patch('/update', updateCollectionsHandler);

export default router;
