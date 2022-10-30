import React, { useEffect, useState } from "react";
import styled from "styled-components";
// Images
import logo from "../images/IconLogo.png";
// Components
import { Search } from "./Search";
import { HeaderNavigation } from "./HeaderNavigation";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import RemoveFriendRequest from "../utils/RemoveFriendRequest";

export const Header = () => {
  const loggedUser = useSelector((state) => state.auth.user);
  const [openNotifications, setOpenNotifications] = useState(false);
  const recievedRequestes = useSelector(
    (state) => state.requestes.requestes.recievedFriendRequestes
  );
  const [recievedRequestesUsers, setRecievedRequestesUsers] = useState([]);
  console.log(recievedRequestes);

  useEffect(() => {
    if (recievedRequestes.length === 0) {
      setRecievedRequestesUsers([]);
      return;
    }
    recievedRequestes?.map((requestID) => {
      getDoc(doc(db, "users", requestID)).then((doc) => {
        const user = doc.data();
        setRecievedRequestesUsers((reqs) => [...reqs, user]);
      });
    });
  }, [recievedRequestes]);

  const acceptRequest = async (loggedUser, stranger) => {
    await setDoc(doc(db, "users", loggedUser.uid, "friends", stranger.id), {
      id: stranger.id,
      displayName: stranger.displayName,
      photoURL: stranger.photoURL || null,
    });
    await setDoc(doc(db, "users", stranger.id, "friends", loggedUser.uid), {
      id: loggedUser.uid,
      displayName: loggedUser.displayName,
      photoURL: loggedUser.photoURL || null,
    });

    await RemoveFriendRequest(stranger, loggedUser);
  };

  return (
    <HeaderContainer>
      <HeaderRow>
        <div className="basis-[30%] flex items-center space-x-5">
          <Image src={logo} onClick={() => signOut(auth)} />
          <Search />
        </div>
        <HeaderNavigation />
        <UserProfile>
          <Image src={loggedUser.photoURL || logo} />
          <button onClick={() => setOpenNotifications((prev) => !prev)}>
            Notifications
          </button>
          {openNotifications && (
            <div className="absolute top-5 left-[-13em] right-0 bg-red">
              {recievedRequestesUsers.map((user) => (
                <p onClick={() => acceptRequest(loggedUser, user)}>
                  {user.displayName}
                </p>
              ))}
            </div>
          )}
        </UserProfile>
      </HeaderRow>
    </HeaderContainer>
  );
};

// Style
const HeaderContainer = styled.div`
  background: #fff;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 1em 0;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2em;
`;

const Image = styled.img`
  width: 100%;
  max-width: 50px;
  margin-right: 1em;
`;

const UserProfile = styled.div`
  padding: 1em;
  display: flex;
  justify-content: flex-end;
  flex-basis: 30%;
  position: relative;
`;
