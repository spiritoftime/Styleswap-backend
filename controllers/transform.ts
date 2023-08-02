import express, { Request, Response } from "express";
import { transformCloudinaryImage } from "../utils/cloudinary.js";
export const transformImage = async (req: Request, res: Response) => {
  const { fileName, effect } = req.body;
  console.log("controller", fileName, effect);
  try {
    const result = await transformCloudinaryImage(fileName, effect);
    res.status(201).json(result);
  } catch (err) {
    console.log(err, "error");
    res.status(500).json(err);
  }
};
