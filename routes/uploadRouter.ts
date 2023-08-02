import express from "express";
import { uploadImage, deleteImages } from "../controllers/upload.js";

const router = express.Router();
router.route("/:userId").post(uploadImage).delete(deleteImages);

export default router;
