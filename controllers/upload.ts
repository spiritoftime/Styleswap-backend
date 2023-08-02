import {
  convertImageToBaseUri,
  deleteCloudinaryImages,
  uploadCloudinaryImage,
  uploadOptions,
} from "../utils/cloudinary.js";
import express, { Request, Response } from "express";

// takes in a base64 string from data and userId from params
export const uploadImage = async (req: Request, res: Response) => {
  //req.fields contains non-file fields
  //req.files contains files
  const { userId } = req.params;
  let image;
  if (Object.keys(req.files).length > 0) {
    image = await convertImageToBaseUri(req.files[Object.keys(req.files)[0]]);
  } else if (req.fields) {
    image = req.fields.file;
  }
  const uploadOptions: uploadOptions = {
    use_filename: true,
    unique_filename: false,
    folder: userId, // firebase user.uid
  };
  // // const image = req.body.file;
  // const image = "./images/attempt.PNG";
  try {
    const result = await uploadCloudinaryImage(image, uploadOptions);
    res.status(201).json(result);
  } catch (err) {
    console.log(err, "error");
    res.status(500).json(err);
  }
};
// takes in a publicId and deletes the image from cloudinary
export const deleteImages = async (req: Request, res: Response) => {
  const { publicId } = req.body;
  try {
    const result = await deleteCloudinaryImages(publicId);
    console.log("done");
    res.status(200).json(result);
  } catch (err) {
    console.log(err, "error");
    res.status(500).json(err);
  }
};
