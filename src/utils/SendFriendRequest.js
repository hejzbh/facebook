import { db } from "../firebase/firebaseConfig";
import { setDoc, doc } from "firebase/firestore";

const storeSentRequest = async (loggedUser, stranger) => {
  await setDoc(
    doc(db, "users", loggedUser.id, "sentFriendsRequestes", stranger.id),
    {
      id: stranger.id,
    }
  );
};

export default async (loggedUser, stranger) => {
  console.log(loggedUser);
  await setDoc(
    doc(db, "users", stranger.id, "recievedFriendsRequestes", loggedUser.id),
    {
      id: loggedUser.id,
    }
  );
  await storeSentRequest(loggedUser, stranger);
};
