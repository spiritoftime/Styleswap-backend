require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2;
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
const image = "./images/attempt.PNG";
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
app.use(express.json());
// app.use("/api/uploads", uploadRouter);
// app.use("/api/user", userRouter);
// app.use("/api/transform", transformRouter);
// app.use("/api/collageRouter", collageRouter);
const uploadOptions = {
  use_filename: true,
  unique_filename: false,
  folder: "FG9mLlC73rbYYQpnbQvsjk1Orp13",
};
async function uploadImage() {
  const result = await cloudinary.uploader.upload(
    image,
    uploadOptions,
    (err, result) => {
      if (err) {
        console.log(err);
      }
    }
  );
  return result;
}
uploadImage().then((res) => console.log(res));
const port =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_PORT
    : process.env.PORT;

app.listen(port, () => console.log(`server running on port ${port}`));
