import React, { useEffect, useState } from "react";
import styled from "styled-components";
// Components
import { Message } from "./Message";
// Firebase
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useSelector } from "react-redux";

export const Messages = ({ messages, chatID }) => {
  const loggedUser = useSelector((state) => state.auth.user);
  const [usersTyping, setUsersTyping] = useState([]);
  useEffect(() => {
    onSnapshot(collection(db, "chats", chatID, "typing"), (snapshot) => {
      setUsersTyping(
        snapshot.docs
          .filter((doc) => doc.id !== loggedUser.uid)
          .map((doc) => doc.data())
      );
    });
  }, [chatID]);

  return (
    <MessagesList>
      {messages.length < 1 ? (
        <p>No messages</p>
      ) : (
        messages.map((message) => <Message message={message} />)
      )}

      <div className="absolute bottom-1 left-1 animate-bounce">
        {usersTyping.map((user) => (
          <img src={user.photo} className="w-full max-w-[40px] rounded-[50%]" />
        ))}
      </div>
    </MessagesList>
  );
};

// Style
const MessagesList = styled.div`
  display: flex;
  padding: 2em 0;
  padding-bottom: 4em;
  flex-direction: column;
  overflow-y: scroll;
  max-height: 400px;
  position: relative;
`;
