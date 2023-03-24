import * as admin from "firebase-admin";
import * as serviceAccount from "../key.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
  databaseURL: "https://proteo-2a2ac-default-rtdb.firebaseio.com",
});

export const fsDb = admin.firestore();
