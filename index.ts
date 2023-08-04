import express, { Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import formidableMiddleware from "express-formidable-v2";

// routes
import uploadRouter from "./routes/uploadRouter.js";
import userRouter from "./routes/userRouter.js";
import transformRouter from "./routes/transformRouter.js";
dotenv.config();
const app: Express = express();
//
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
console.log("hii.");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/uploads", formidableMiddleware(), uploadRouter);
app.use("/api/user", userRouter);
app.use("/api/transform", transformRouter);
// app.use("/api/collageRouter", collageRouter);

// deleteImage("FG9mLlC73rbYYQpnbQvsjk1Orp13/attempt").then((res) =>
//   console.log(res)
// );
const port = 3000;

app.listen(port, () => console.log(`server running on port ${port}`));
