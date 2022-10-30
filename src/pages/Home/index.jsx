import React from "react";
import { auth } from "../../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import styled from "styled-components";
// Components
import { Feed } from "../../components/Feed";
import { Sidebar } from "../../components/Sidebar";
import { Contacts } from "../../components/Contacts";

export const Home = () => {
  return (
    <HomeContainer>
      {/** Sidebar */}
      <Sidebar />
      {/** Feed */}
      <Feed />
      {/** Contacts */}
      <Contacts />
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 90vh;
`;
