import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../../utils/colors";
// Components
import { Button } from "../../components/Button";
// Icons
import { FcGoogle } from "react-icons/fc";
// Firebase
import { auth } from "../../firebase/firebaseConfig";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

export const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState({
    value: "",
    type: "",
  });

  const LoginWithEmailAndPassword = async (e) => {
    e.preventDefault();

    await signInWithEmailAndPassword(auth, loginData.email, loginData.password)
      .then((success) => {
        setMessage({ type: "success", value: "Successfully login" });
      })
      .catch((error) => {
        setMessage({
          type: "error",
          value: error.message,
        });
      });
  };

  const loginWithGoogle = async () => {
    const GoogleProvider = new GoogleAuthProvider();

    await signInWithPopup(auth, GoogleProvider)
      .then((success) => {
        setMessage({ type: "success", value: "Uspješno ste se prijavili" });
      })
      .catch((error) => {
        setMessage({
          type: "error",
          value: error.message,
        });
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((loginData) => ({ ...loginData, [name]: value }));
  };

  return (
    <FormContainer>
      <Form onSubmit={LoginWithEmailAndPassword}>
        {message.value && (
          <p style={{ color: message.type == "error" ? "red" : "green" }}>
            {message.value}
          </p>
        )}
        {/** Email or phone nubmer */}
        <Input
          placeholder="Email or phone number"
          name="email"
          value={loginData.email}
          onChange={handleInputChange}
        />
        {/** Password */}
        <Input
          placeholder="Password"
          name="password"
          type="password"
          value={loginData.password}
          onChange={handleInputChange}
        />

        <ButtonsRow>
          {/** Submit for credentials */}
          <Button
            title="Prijavi se"
            type="submit"
            color="#fff"
            bg={colors.facebookBlue}
            stretch={true}
          />
          {/** Submit for google */}
          <Button
            customStyle={{
              boxShadow: "rgba(100, 100, 111, 0.3) 0px 7px 29px 0px",
            }}
            type="button"
            color="#fff"
            onClick={loginWithGoogle}
            Icon={<FcGoogle fontSize={22} />}
            bg={"#fff"}
          />
        </ButtonsRow>
      </Form>
    </FormContainer>
  );
};

export default LoginForm;

// Style
const FormContainer = styled.div`
  padding: 1.5em;
  border-radius: 24px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  background: #fff;
`;

const Form = styled.form`
  border-bottom: 5px solid ${colors.ultraLightGray};
  padding: 2em 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  border: 1px solid rgba(128, 128, 128, 0.5);
  padding: 2em;
  border-radius: 7px;
  outline: none;
  width: 100%;
  margin-bottom: 1em;
  transition: 250ms ease all;
  font-family: Roboto, "sans-serif";
  font-size: 18px;

  &:focus {
    border: 1px solid ${colors.facebookBlue};
  }
`;

const ButtonsRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
`;
