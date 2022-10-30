import { auth } from "../firebase/firebaseConfig";
import { RecaptchaVerifier } from "firebase/auth";
export default () => {
  window.RecaptchaVerifier = new RecaptchaVerifier(
    "recaptcha-container",
    {
      size: "invisible",
      callback: (response) => {
        // Recaptcha generated
      },
    },
    auth
  );
};
