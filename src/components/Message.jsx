import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const FromMe = ({ children }) => {
  console.log(children);

  return <div className="flex items-center flex-row-reverse">{children}</div>;
};

const FromStranger = ({ children }) => {
  return <div className="flex items-center">{children}</div>;
};

export const Message = ({ message }) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <MessageContainer>
      {message.sender.id === user.uid ? (
        <FromMe>{message.message}</FromMe>
      ) : (
        <FromStranger>{message.message}</FromStranger>
      )}
    </MessageContainer>
  );
};

// Style
const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 80%;
`;

const SenderProfilePhoto = styled.img`
  width: 100%;
  max-width: 35px;
  border-radius: 50%;
`;
