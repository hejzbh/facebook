import { collection, doc } from "firebase/firestore";
import React, { useEffect, useMemo, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { onSnapshot } from "firebase/firestore";
import styled from "styled-components";
import { useSelector } from "react-redux";
// Components
import { ChatHeader } from "./ChatHeader";
import { SendMessageInput } from "./SendMessageInput";
import { Messages } from "../Messages";

export const Chat = ({ chatID }) => {
  const loggedUser = useSelector((state) => state.auth.user);
  const [isFetched, setIsFetched] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [userWeChatWith, setUserWeChatWith] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    onSnapshot(doc(db, "chats", chatID), (snapshot) => {
      const chatData = snapshot.data();
      setMessages(chatData.messages);

      // Only if there are no chat users, set
      if (!userWeChatWith) {
        setUserWeChatWith(
          ...chatData.users.filter((user) => user.id !== loggedUser.uid)
        );
      }
      if (!isFetched) setIsFetched(true);
    });
  }, []);

  const chatHeaderProps = useMemo(() => {
    return {
      chatID,
      userWeChatWith,
      isMinimized,
      setIsMinimized,
    };
  }, [isMinimized, userWeChatWith]);

  return (
    <>
      {isFetched && (
        <ChatContainer>
          {isMinimized ? (
            <ChatHeader {...chatHeaderProps} />
          ) : (
            <div className="relative">
              <ChatHeader {...chatHeaderProps} />
              <Messages messages={messages} chatID={chatID} />
              <SendMessageInput chatID={chatID} />
            </div>
          )}
        </ChatContainer>
      )}
    </>
  );
};

// Style
const ChatContainer = styled.div`
  width: 100%;
  max-width: 370px;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;
