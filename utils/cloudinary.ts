import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import { promisify } from "util";

// Convert fs.readFile function to a Promise-based version
const readFileAsync = promisify(fs.readFile);

export const convertImageToBaseUri = async (file: File) => {
  try {
    // Read the file as a Buffer
    const fileBuffer = await readFileAsync(file.path);

    // Convert the Buffer to a Base64 URI
    const base64URI = `data:${file.type};base64,${fileBuffer.toString(
      "base64"
    )}`;

    return base64URI;
  } catch (error) {
    // Handle any errors that occurred during the conversion
    throw error;
  }
};
export type uploadOptions = {
  use_filename: boolean;
  unique_filename: boolean;
  folder: string;
};
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// const uploadOptions = {
//   use_filename: true,
//   unique_filename: false,
//   folder: "FG9mLlC73rbYYQpnbQvsjk1Orp13", // firebase user.uid
// };
// can be a url or a file path or a base64 string
export async function uploadCloudinaryImage(
  image: File,
  uploadOptions: uploadOptions
) {
  const result = await cloudinary.uploader.upload(image, uploadOptions);
  return result;
}
export async function deleteCloudinaryImage(publicId: string) {
  const result = await cloudinary.uploader.destroy(publicId);
  return result;
}
