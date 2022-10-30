// Firebase
import { db } from "../firebase/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";

export default async (userOne, userTwo) => {
  try {
    alert("wow");
    const userOneFollowsSecond = await getDoc(
      doc(db, "users", userOne.id, "friends", userTwo.id)
    ).then((doc) => doc.exists());
    const userSecondFollowFirst = await getDoc(
      doc(db, "users", userTwo.id, "friends", userOne.id)
    ).then((doc) => doc.exists());

    console.log(userOneFollowsSecond && userSecondFollowFirst);

    return userOneFollowsSecond && userSecondFollowFirst;
  } catch (err) {
    alert(err);
  }
};
