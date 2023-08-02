import express from "express";
import { transformImage } from "../controllers/transform.js";

const router = express.Router();
router.route("/:userId").post(transformImage);

export default router;
