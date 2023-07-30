import {
  deleteCloudinaryImage,
  uploadCloudinaryImage,
  uploadOptions,
} from "../utils/cloudinary";
import express, { Request, Response } from "express";

// takes in a base64 string from data and userId from params
export const uploadImage = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const uploadOptions: uploadOptions = {
    use_filename: true,
    unique_filename: false,
    folder: userId, // firebase user.uid
  };
  const image = req.body.imageUri;
  try {
    const result = await uploadCloudinaryImage(image, uploadOptions);
    res.status(201).json(result);
  } catch (err) {
    console.log(err, "error");
    res.status(500).json(err);
  }
};
// takes in a publicId and deletes the image from cloudinary
export const deleteImage = async (req: Request, res: Response) => {
  const { publicId } = req.params;
  try {
    const result = await deleteCloudinaryImage(publicId);
    res.status(200).json(result);
  } catch (err) {
    console.log(err, "error");
    res.status(500).json(err);
  }
};
