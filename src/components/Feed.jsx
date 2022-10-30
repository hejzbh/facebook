import React from "react";
import styled from "styled-components";
// Components
import { Posts } from "./Posts";
import Chats from "./chat/Chats";
export const Feed = () => {
  return (
    <FeedContainer>
      <Posts />
      <Chats />
    </FeedContainer>
  );
};

const FeedContainer = styled.div`
  min-height: 100vh;
  padding: 2em;
  flex-basis: 50%;
  flex: 5;
  position: relative;
`;
