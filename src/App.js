import React, { useEffect } from "react";
import styled from "styled-components";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { login, updateUser, logout } from "./features/auth/AuthSlice";
// React routes
import { Routes, Route } from "react-router-dom";
// Firebase
import { auth, db } from "./firebase/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import setUserToFirestore from "./firebase/firestore/SetUser";
// Components / Pages
import Login from "./pages/Login/index";
import Home from "./pages/Home/index";
import { colors } from "./utils/colors";

function App() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // User is signed in ?
      if (user) {
        dispatch(login({ payload: user }));
      }
      // User is not signed in ?
      else {
        dispatch(logout());
      }
    });
  }, []);

  useEffect(() => {
    if (!user) return;

    onSnapshot(doc(db, "users", user.uid), (snapshot) => {
      if (snapshot.exists()) {
        dispatch(
          updateUser({
            uid: snapshot.data().id,
            ...snapshot.data(),
          })
        );
      } else {
        setUserToFirestore(user.uid, {
          id: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          gender: user.gender || null,
          birthDate: user.birthDate || null,
        });
      }
    });
  }, [user?.uid]);

  // There is no user ? Show login page
  if (!user)
    return (
      <Container>
        <Routes>
          <Route path="/" element={<Login />}></Route>
        </Routes>
      </Container>
    );

  return (
    <Container>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </Container>
  );
}

export default App;

const Container = styled.div`
  background: ${colors.ultraLightGray};
`;
