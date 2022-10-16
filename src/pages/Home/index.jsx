import React from "react";
import { auth } from "../../firebase/firebaseConfig";
import { signOut } from "firebase/auth";

export const Home = () => {
  return (
    <div>
      <button onClick={() => signOut(auth)}>Logout</button>
      <h1>SADFDASDS</h1>
    </div>
  );
};

export default Home;
