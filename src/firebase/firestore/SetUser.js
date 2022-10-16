import { db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export default async (userID, data) => {
  try {
    const userDoc = doc(db, "users", userID);
    let updatedData = { ...data };
    if (updatedData.uid) delete updatedData.uid;
    alert("wow");

    await setDoc(userDoc, { ...updatedData, id: userID }, { merge: true });
  } catch (err) {
    alert(err);
  }
};
