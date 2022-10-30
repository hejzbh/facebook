import { db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export default async (userID, data) => {
  try {
    const userDoc = doc(db, "users", userID);
    let userData = data;
    if (userData.uid) delete userData.uid;
    alert("Ode na firebase");
    console.log(userData);

    await setDoc(userDoc, { ...userData, id: userID }, { merge: true });
  } catch (err) {
    alert(err);
  }
};
