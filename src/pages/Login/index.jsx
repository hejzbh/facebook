import React, { useState } from "react";
import styled from "styled-components";
// Forms
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
// Utils
import { colors } from "../../utils/colors";
// Images
import TextLogo from "../../images/TextLogo.png";
// Components
import { Button } from "../../components/Button";

export const Login = () => {
  const [activeForm, setActiveForm] = useState({
    login: true,
    register: false,
  });

  const toggleForms = () =>
    setActiveForm((forms) => ({
      login: forms.register,
      register: forms.login,
    }));

  return (
    <LoginContainer className="container">
      <LeftSide>
        <img
          src={TextLogo}
          style={{ width: "100%", maxWidth: "300px" }}
          alt="Facebook"
        />
        <p>
          Facebook connecting you with other people and make easy providing
          informations
        </p>
      </LeftSide>
      <RightSide>
        {activeForm.login ? <LoginForm /> : <RegisterForm />}

        {/** Button for switching forms */}
        <Button
          bg={colors.green}
          color="#fff"
          title={
            activeForm.login ? "Kreirajte novi račun" : "Prijavite se na račun"
          }
          onClick={toggleForms}
        />
      </RightSide>
    </LoginContainer>
  );
};

export default Login;

// Style
const LoginContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 850px) {
    flex-direction: column !important;
    justify-content: center;
  }
`;

const LeftSide = styled.div`
  width: 100%;
  flex-basis: 48%;
  & > p {
    font-size: 1.5rem;
    max-width: 80%;
  }
  @media (max-width: 850px) {
    flex-basis: 100%;
    text-align: center;

    & > p {
      max-width: 100%;
      font-size: 16px;
      margin-bottom: 1.5em;
    }
  }
`;

const RightSide = styled.div`
  width: 100%;
  flex-basis: 48%;
  text-align: center;

  @media screen and(max-width:850px) {
    flex-basis: 100%;
  }
`;
