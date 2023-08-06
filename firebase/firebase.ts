import admin, { ServiceAccount } from "firebase-admin";
import serviceAccount from "../styleswap-firebase.json";
import dotenv from "dotenv";
dotenv.config();
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
  databaseURL: process.env.FIREBASE_URL,
});
export default admin;
