import React, { useEffect, useState } from "react";
import styled from "styled-components";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { login, updateUser, logout } from "./features/auth/AuthSlice";
import { setFriends } from "./features/friends/FriendsSlice";
import {
  setSentFriendRequestes,
  setRecievedFriendsRequestes,
} from "./features/requestes/RequestesSlice";
// React routes
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
// Firebase
import { auth, db } from "./firebase/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { collection } from "firebase/firestore";
import setUserToFirestore from "./firebase/firestore/SetUser";
// Components / Pages
import Login from "./pages/Login/index";
import Home from "./pages/Home/index";
import { Header } from "./components/Header";
import { Profile } from "./components/profile/Profile";
// Utils
import { colors } from "./utils/colors";

const FriendsPage = () => (
  <div>
    <h1>Friends</h1>
  </div>
);

function App() {
  const user = useSelector((state) => state.auth.user);
  const friends = useSelector((state) => state.friends.friends);
  const requestes = useSelector((state) => state.requestes.requestes);
  const [fetching, setFetching] = useState(false);
  const userNotAtHome = useLocation().pathname !== "/";
  const dispatch = useDispatch();
  const navigation = useNavigate();

  console.log(requestes);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // User is signed in ?
      setFetching(true);
      if (user) {
        dispatch(login({ payload: user }));
        console.log(user);
      }
      // User is not signed in ?
      else {
        dispatch(logout());
      }
      setFetching(false);
    });
  }, []);

  useEffect(() => {
    if (!user) return;
    // Get users friends
    onSnapshot(collection(db, "users", user.uid, "friends"), (snapshot) => {
      const friends = snapshot.docs.map((doc) => doc.data());
      dispatch(setFriends({ friends }));
    });

    // Requestes
    onSnapshot(
      collection(db, "users", user.uid, "sentFriendsRequestes"),
      (snapshot) => {
        const sentRequestes = snapshot.docs.map((doc) => doc.data().id);
        dispatch(setSentFriendRequestes({ requestes: sentRequestes }));
      }
    );
    onSnapshot(
      collection(db, "users", user.uid, "recievedFriendsRequestes"),
      (snapshot) => {
        const recievedRequestes = snapshot.docs.map((doc) => doc.data().id);
        dispatch(setRecievedFriendsRequestes({ requestes: recievedRequestes }));
      }
    );

    // Get user firestore data
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
          displayName: user.displayName || null,
          spelledName: user.displayName?.split(" ") || null,
          gender: user.gender || null,
          birthDate: user.birthDate || null,
          email: user.email || null,
          photoURL: user.photoURL || null,
        });
      }
    });
  }, [user?.uid]);

  // There is no user ? Show login page
  if (!user && !fetching) {
    if (userNotAtHome) {
      navigation("/");
    }
    return (
      <Container>
        <Routes>
          <Route path="/" element={<Login />}></Route>
        </Routes>
      </Container>
    );
  }

  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/friends" element={<FriendsPage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </Container>
  );
}

export default App;

const Container = styled.div`
  background: ${colors.ultraLightGray};
`;
