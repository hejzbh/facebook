import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default async (loggedUser, stranger) => {
  console.log(loggedUser, stranger);
  await deleteDoc(
    doc(db, "users", loggedUser.id, "sentFriendsRequestes", stranger.id)
  );
  await deleteDoc(
    doc(db, "users", stranger.id, "recievedFriendsRequestes", loggedUser.id)
  );
};
