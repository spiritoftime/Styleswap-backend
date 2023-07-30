import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
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
const image = "./images/attempt.PNG";
export async function uploadCloudinaryImage(
  image: string,
  uploadOptions: uploadOptions
) {
  const result = await cloudinary.uploader.upload(image, uploadOptions);
  return result;
}
export async function deleteCloudinaryImage(publicId: string) {
  const result = await cloudinary.uploader.destroy(publicId);
  return result;
}
