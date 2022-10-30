import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
// Components
import { Chat } from "./Chat";

export const Chats = () => {
  const activeChats = useSelector((state) => state.activeChats.activeChats);
  return (
    <ActiveChatsWrapper>
      {activeChats.map((chat) => (
        <Chat chatID={chat.id} />
      ))}
    </ActiveChatsWrapper>
  );
};
export default Chats;

// Style
const ActiveChatsWrapper = styled.div`
  width: 100%;
  max-width: 80%;
  position: absolute;
  bottom: 2em;
  right: 2em;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
`;
