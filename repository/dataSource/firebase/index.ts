import { FirebaseUserRespository } from "./user.firebaseRepository";
import { getFirestore } from "firebase-admin/firestore";
import admin from "firebase-admin";
import serviceAccount from "../../../ebuddy-f4683-firebase-adminsdk-hd4us-0c70dd3a51.json";
import { FirebaseLabelRepository } from "./label.firebaseRepository";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

let fireStoreClient = getFirestore();

const firebaseUserRepository = new FirebaseUserRespository(fireStoreClient);
const firebaseLabelRepository = new FirebaseLabelRepository(fireStoreClient);

export { firebaseUserRepository, firebaseLabelRepository };
