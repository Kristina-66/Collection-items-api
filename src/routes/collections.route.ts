import express from "express";
import {
  createCollectionHandler,
  deleteCollectionsHandler,
  getAllCollectionsHandler,
  getCollectionHandler,
  updateCollectionsHandler,
} from "../controllers/collections.controller";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import multer from "multer";
import path from "path";

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

router.post("/", upload.single("image"), createCollectionHandler);

router.delete("/", deleteCollectionsHandler);

router.patch("/update", updateCollectionsHandler);

router.get("/:id", getCollectionHandler);

router.get("/", getAllCollectionsHandler);

export default router;
