import React, { useEffect, useState } from "react";
// Router
import { useLocation } from "react-router-dom";
// Images
import NoCoverPhoto from "../../images/facebook.png";
import noProfilePhoto from "../../images/noProfilePhoto.jpg";
// Firebase
import { db } from "../../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import styled from "styled-components";
// Utils
import areUsersFriends from "../../utils/areUsersFriend";
import SendFriendRequest from "../../utils/SendFriendRequest";
import isFriendRequestSent from "../../utils/isFriendRequestSent";
import RemoveFriendRequest from "../../utils/RemoveFriendRequest";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { removeFriend } from "../../features/friends/FriendsSlice";
export const Profile = () => {
  const {
    state: { userID },
  } = useLocation();
  const loggedUser = useSelector((state) => state.auth.user);
  const requestes = useSelector((state) => state.requestes);
  const [user, setUser] = useState();
  const [isFriendsWith, setIsFriendsWith] = useState(false); // did logged user friends with user we are looking for
  const [isRequestSent, setIsRequestSent] = useState(false); //did user send friend request

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userID) return;
    // GET USER
    getDoc(doc(db, "users", userID)).then((doc) => {
      setUser(doc.data());
    });
  }, [userID]);

  useEffect(() => {
    if (!loggedUser || !user) return;
    alert("Ponovo");

    areUsersFriends(loggedUser, user).then((results) =>
      results === true ? setIsFriendsWith(true) : setIsFriendsWith(false)
    );
    isFriendRequestSent(loggedUser, user).then((result) =>
      result === true ? setIsRequestSent(true) : setIsRequestSent(false)
    );
  }, [loggedUser.uid, user, requestes]);

  return (
    <ProfileContainer>
      {user ? (
        <>
          <UserIntroduction className="container">
            <CoverPhoto src={user.coverPhoto || NoCoverPhoto} />
            <UserPresentation>
              <ProfilePhoto src={user.photoURL || noProfilePhoto} />
              <p className="text-lg md:text-2xl text-white shadow-lg bg-black/30 p-2 px-4">
                {user.displayName}
              </p>
            </UserPresentation>
            <Controller>
              {user.id !== loggedUser.uid ? (
                <button
                  onClick={async () => {
                    !isFriendsWith &&
                      (await SendFriendRequest(loggedUser, user));
                    isRequestSent &&
                      (await RemoveFriendRequest(loggedUser, user));
                  }}
                  className="bg-white p-2 px-6 shadow-2xl"
                >
                  {isRequestSent
                    ? "Request sent"
                    : isFriendsWith
                    ? "Friends"
                    : "Send friend request"}
                </button>
              ) : (
                ""
              )}
            </Controller>
          </UserIntroduction>
        </>
      ) : (
        <h1>Loading</h1>
      )}
    </ProfileContainer>
  );
};

// Style
const ProfileContainer = styled.div`
  width: 100%;
  min-height: 90vh;
`;

const UserIntroduction = styled.div`
  width: 100%;
  position: relative;
`;

const UserPresentation = styled.div`
  position: absolute;
  left: 1rem;
  bottom: -2rem;
  display: flex;
  align-items: center;
  img {
    margin-right: 0.8rem;
  }
`;

const CoverPhoto = styled.img`
  width: 100%;
  height: 100%;
  max-height: 25em;
  object-fit: cover;
`;

const ProfilePhoto = styled.img`
  width: 100%;
  max-width: 190px;
  border-radius: 50%;
  outline: 7px solid white;
`;

const Controller = styled.div`
  position: absolute;
  bottom: 1em;
  right: 1rem;
  display: flex;
  align-items: center;
`;
