import React from "react";
import styled from "styled-components";
// Redux
import { useDispatch } from "react-redux";
import { removeActiveChat } from "../../features/active-chats/ActiveChatsSlice";

export const ChatHeader = ({
  chatID,
  userWeChatWith,
  isMinimized,
  setIsMinimized,
}) => {
  const dispatch = useDispatch();

  const closeChat = (chatID) => {
    dispatch(removeActiveChat(chatID));
  };

  const toggleMinimizeChat = (e) => {
    if (e.target.nodeName === "BUTTON") return; // we clicked button for close chat forever
    setIsMinimized((prev) => !prev);
  };

  return (
    <ChatHeaderContainer
      onClick={toggleMinimizeChat}
      style={{
        background: isMinimized ? "gray" : "#23589C",
      }}
    >
      <>
        <UserProfilePhoto src={userWeChatWith.photoURL} />
        <p style={{ color: isMinimized ? "black" : "#fff" }}>
          {userWeChatWith.displayName}
        </p>
      </>

      <CloseChatBTN onClick={() => closeChat(chatID)}>Zatvori</CloseChatBTN>
    </ChatHeaderContainer>
  );
};

// Style
const ChatHeaderContainer = styled.div`
  width: 100%;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserProfilePhoto = styled.img`
  width: 100%;
  max-width: 40px;
  border-radius: 50%;
  margin-right: 8px;
`;

const CloseChatBTN = styled.button`
  outline: 0;
  border: 0;
  padding: 1em;
`;
