import express, { Express } from "express";
import multer from "multer";
import path from "path";
import {
  createItemHandler,
  deleteItemsHandler,
  getAllItemsInCollectionHandler,
  getItemHandler,
  updateItemHandler,
} from "../controllers/item.controller";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { validate } from "../middleware/validate";
import { createItemSchema } from "../schema/item.schema";

const router = express.Router();
router.use(deserializeUser, requireUser);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },

  filename: function (req: any, file: any, cb: any) {
    cb(
      null,
      file.originalname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const fileFilter = (req: any, file: any, cb: any) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post("/", upload.single("image"), createItemHandler);

router.delete("/", deleteItemsHandler);

router.patch("/update", updateItemHandler);

router.get("/:id", getAllItemsInCollectionHandler);

router.get("/:id", getItemHandler);

export default router;
