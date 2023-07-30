import express from "express";
import { uploadImage, deleteImage } from "../controllers/upload";

const router = express.Router();
router.route("/:userId").post(uploadImage).delete(deleteImage);

export default router;
