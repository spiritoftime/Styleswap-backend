import express, { Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import formidable from "express-formidable";

// routes
import uploadRouter from "./routes/uploadRouter.js";
import userRouter from "./routes/userRouter.js";
dotenv.config();
const app: Express = express();
app.use(formidable());
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
app.use("/api/uploads", uploadRouter);
app.use("/api/user", userRouter);
// app.use("/api/transform", transformRouter);
// app.use("/api/collageRouter", collageRouter);

// deleteImage("FG9mLlC73rbYYQpnbQvsjk1Orp13/attempt").then((res) =>
//   console.log(res)
// );
const port =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_PORT
    : process.env.PORT;

app.listen(port, () => console.log(`server running on port ${port}`));
