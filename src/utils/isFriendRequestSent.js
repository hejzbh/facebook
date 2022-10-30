import { db } from "../firebase/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
export default async (loggedUser, stranger) => {
  console.log(loggedUser);
  console.log(stranger);
  const isSent = await getDoc(
    doc(db, "users", loggedUser.id, "sentFriendsRequestes", stranger.id)
  ).then((doc) => doc.exists());

  return isSent;
};
