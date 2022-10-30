import React, { useMemo, useState } from "react";
import styled from "styled-components";
// Utils
import { colors } from "../../utils/colors";
// Components
import { Button } from "../../components/Button";
// Icons
import { FcGoogle } from "react-icons/fc";
// Helpers
import doesUserEnterNumber from "../../utils/helpers/DoesUserEnterNumber";
// Firebase
import {
  createUserWithEmailAndPassword,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
// Function used in this component
import verifyPhoneCode from "../../utils/verifyPhoneCode";
import generateRecaptcha from "../../utils/generateRecaptcha";
import signInWithGoogle from "../../utils/signInWithGoogle";
import storeUserInFirestore from "../../firebase/firestore/SetUser";

export const RegisterForm = () => {
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthDate: new Date(),
    gender: "",
    number: "",
  });
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState({
    value: "",
    type: "",
  });

  const removeEmail = () =>
    setRegisterData((data) => {
      let newData = data;
      delete newData.email;

      return newData;
    });

  const register = async (e) => {
    e.preventDefault();
    try {
      // If user entered email create profile with email, if user entered number, create profile with phone number.
      const registring = registerData.email
        ? await createUserWithEmailAndPassword(
            auth,
            registerData.email,
            registerData.password
          ).then((result) => {
            storeUserInFirestore(result.user.uid, {
              displayName: `${registerData.firstName} ${registerData.lastName}`,
              spelledName:
                `${registerData.firstName} ${registerData.lastName}`.split(
                  ""
                ) || null,
              gender: registerData.gender,
              birthDate: registerData.birthDate,
              number: registerData.number,
              email: registerData.email || null,
              photoURL: null,
            });
          })
        : await createUserWithPhoneNumber();
    } catch (err) {
      alert(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, type, value } = e.target;
    let inputValue = value;
    let inputName = name;

    if (type == "date") inputValue = new Date(value).toISOString();

    // In case user entering a number besides the email
    if (doesUserEnterNumber(inputName, inputValue)) {
      inputName = "number";
      removeEmail();
    }

    setRegisterData((data) => ({ ...data, [inputName]: inputValue }));
  };

  async function createUserWithPhoneNumber() {
    // Generate recaptcha code
    generateRecaptcha();
    // Get recaptcha verifier
    const appVerifier = window.RecaptchaVerifier;
    // Try to login with number
    await signInWithPhoneNumber(auth, registerData.number, appVerifier)
      .then((confirmationResult) => {
        // Code has successfully sent to user's mobile
        setIsVerificationSent(true);
        // Display message about success sent
        setMessage({
          type: "success",
          value: "Poslan vam je kod na broj",
        });
        // Store results in window variable for next procedure
        window.confirmationResult = confirmationResult;
      })
      .catch((err) => {
        setMessage({
          type: "error",
          value: err.message,
        });
      });
  }

  return (
    <FormContainer>
      <Form onSubmit={register}>
        {message.value && (
          <p style={{ color: message.type == "error" ? "red" : "green" }}>
            {message.value}
          </p>
        )}

        {/** First and last name */}
        <InputRow>
          <Input
            placeholder="Ime"
            name="firstName"
            type="text"
            value={registerData.firstName}
            onChange={handleInputChange}
          />
          <Input
            placeholder="Prezime"
            name="lastName"
            type="text"
            value={registerData.lastName}
            onChange={handleInputChange}
          />
        </InputRow>

        {/** Email or phone nubmer */}
        <Input
          placeholder="Email or phone number"
          name="email"
          type="text"
          value={registerData.email ? registerData.email : registerData.number}
          onChange={handleInputChange}
        />

        {/** Password */}
        <Input
          placeholder="Password"
          name="password"
          type={"password"}
          value={registerData.password}
          onChange={handleInputChange}
        />

        {/** Birthdate picker */}
        <Input
          placeholder="Datum rodjenja"
          name="birthDate"
          type="date"
          value={registerData.birthDate}
          onChange={handleInputChange}
        />

        {/** Verification code for mobile if it exists */}
        {isVerificationSent && (
          <InputRow>
            <Input
              placeholder="Kod"
              max={6}
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <Button
              title="Verifikuj kod"
              type="button"
              color="#fff"
              disabled={verificationCode.length !== 6}
              bg={colors.green}
              onClick={() =>
                verifyPhoneCode(verificationCode, registerData, setMessage)
              }
            />
          </InputRow>
        )}

        {/** Gender */}
        <InputRow>
          <label htmlFor="gender">Muško</label>
          <Input
            onChange={handleInputChange}
            type="radio"
            name="gender"
            value="male"
          />
          <label htmlFor="gender">Žensko</label>
          <Input
            onChange={handleInputChange}
            type="radio"
            name="gender"
            value="women"
          />
        </InputRow>

        <ButtonsRow>
          {/** Submit for credentials */}
          <Button
            title="Registruj se"
            type="submit"
            color="#fff"
            bg={colors.facebookBlue}
            marginTop="1em"
            stretch={true}
          />
          {/** Submit for google */}
          <Button
            customStyle={{
              boxShadow: "rgba(100, 100, 111, 0.3) 0px 7px 29px 0px",
            }}
            type="button"
            color="#fff"
            onClick={() => signInWithGoogle(setMessage)}
            Icon={<FcGoogle fontSize={22} />}
            marginTop="1em"
            bg={"#fff"}
          />
        </ButtonsRow>

        <div id="recaptcha-container"></div>
      </Form>
    </FormContainer>
  );
};

export default RegisterForm;

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

const InputRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const ButtonsRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
`;
