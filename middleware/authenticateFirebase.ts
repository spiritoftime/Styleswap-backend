import { Request, Response, NextFunction } from "express";
import admin from "../firebase/firebase.js";

export const authenticateFirebase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const decodeValue = await admin.auth().verifyIdToken(token);
    if (decodeValue) {
      req.user = decodeValue;
      console.log("decodeValue", decodeValue);
      return next();
    } else return res.status(401).json({ message: "Unauthorized" });
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
