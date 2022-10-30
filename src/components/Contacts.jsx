import React, { useEffect, useState } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setActiveChats } from "../features/active-chats/ActiveChatsSlice";
import styled from "styled-components";
// Firebase
import {
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
// iMAGES
import noImageFround from "../images/noProfilePhoto.jpg";
export const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const loggedUser = useSelector((state) => state.auth.user);
  const friends = useSelector((state) => state.friends.friends);
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.activeChats.activeChats);
  console.log(chats);

  const openChat = async (loggedUser, user) => {
    let combinedID =
      loggedUser.uid > user.id
        ? loggedUser.uid + user.id
        : user.id + loggedUser.uid;

    const chat = await getDoc(doc(db, "chats", combinedID));

    if (!chat.exists()) {
      // create chat
      const newChatData = {
        messages: [],
        users: [loggedUser, user],
        id: combinedID,
      };
      const newChat = await setDoc(doc(db, "chats", combinedID), newChatData);

      dispatch(setActiveChats({ newChat: newChatData }));
    } else {
      const existingChat = chat.data();
      dispatch(setActiveChats({ newChat: existingChat }));
    }
  };

  return (
    <ContactsContainer>
      <ContactsList>
        <h1>Contacts</h1>
        {friends.map((friend) => (
          <li
            onClick={() => openChat(loggedUser, friend)}
            className="flex items-center justify-between cursro-pointer"
          >
            <img src={friend.photoURL || noImageFround} />
            <p>{friend.displayName}</p>
          </li>
        ))}
      </ContactsList>
    </ContactsContainer>
  );
};

// Style
const ContactsContainer = styled.div`
  flex-basis: 25%;
  padding: 2em;
`;

const ContactsList = styled.ul`
  list-style: none;
  width: 100%;
  display: flex;
  flex-direction: column;

  h1 {
    color: gray;
    font-size: 20px;
  }
`;
