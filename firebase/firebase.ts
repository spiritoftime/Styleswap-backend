import admin, { ServiceAccount } from "firebase-admin";

import dotenv from "dotenv";

dotenv.config();
const serviceAccount = process.env.FIREBASE_CONFIG;
admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(serviceAccount) as ServiceAccount
  ),
  databaseURL: process.env.FIREBASE_URL,
});
export default admin;
