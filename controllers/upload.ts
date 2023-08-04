import {
  convertImageToBaseUri,
  deleteCloudinaryImages,
  uploadCloudinaryImage,
  uploadOptions,
} from "../utils/cloudinary.js";
import express, { Request, Response } from "express";
import { Fields, Files, EventNames } from "formidable";
declare global {
  namespace Express {
    interface Request {
      fields?: Fields;
      files?: Files;
    }
  }
}
interface ExpressFormidableOptions {
  encoding?: string;
  uploadDir?: string;
  keepExtensions?: boolean;
  type?: "multipart" | "urlencoded";
  maxFileSize?: number;
  maxFieldsSize?: number;
  maxFields?: number;
  hash?: boolean | "sha1" | "md5";
  multiples?: boolean;
}

interface ExpressFormidableEvents {
  event: EventNames;
  action: (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
    ...formidableParameters: any[]
  ) => void;
}
// takes in a base64 string from data and userId from params
export const uploadImage = async (req: Request, res: Response) => {
  //req.fields contains non-file fields
  //req.files contains files
  const { userId } = req.params;
  let image;
  console.log("wtf?");
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
