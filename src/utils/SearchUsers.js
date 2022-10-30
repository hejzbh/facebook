// Firebase
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

export default async (userName) => {
  const users = await getDocs(collection(db, "users")).then((results) => {
    return results.docs
      .filter((doc) => {
        const firestoreUser = doc.data();
        return firestoreUser.displayName.includes(userName);
      })
      .map((doc) => doc.data());
  });

  return users;
};
