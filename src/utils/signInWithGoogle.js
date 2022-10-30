import { auth } from "../firebase/firebaseConfig";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";

export default async (setMessage) => {
  const GoogleProvider = new GoogleAuthProvider();

  await signInWithPopup(auth, GoogleProvider)
    .then((result) => {
      setMessage({
        type: "success",
        value: "Uspješno ste se prijavili",
      });
    })
    .catch((err) => {
      setMessage({
        type: "error",
        value: err.message,
      });
    });
};
