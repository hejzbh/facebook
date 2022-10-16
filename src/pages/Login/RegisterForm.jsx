import React, { useMemo, useState } from "react";
import styled from "styled-components";
// Utils
import { colors } from "../../utils/colors";
// Components
import { Button } from "../../components/Button";
// Libaries
import DatePicker from "react-datepicker";
// Icons
import { FcGoogle } from "react-icons/fc";
// Helpers
import doesUserEnterNumber from "../../utils/helpers/DoesUserEnterNumber";
// Firebase
import {
  createUserWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

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
  const [message, setMessage] = useState({
    value: "",
    type: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, type, value } = e.target;
    let inputValue = value;
    let inputName = name;

    if (type == "date") inputValue = new Date(value).toDateString();

    // In case user entering a number besides the email
    if (doesUserEnterNumber(inputName, inputValue)) {
      inputName = "number";
      inputValue = +inputValue || ""; // convert to number
      removeEmail();
    }

    setRegisterData((data) => ({ ...data, [inputName]: inputValue }));
  };

  const removeEmail = () =>
    setRegisterData((data) => {
      let newData = data;
      delete newData.email;

      return newData;
    });

  const loginWithGoogle = () => {};

  const register = async (e) => {
    e.preventDefault();
    try {
      const phoneVerify = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "normal",
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // ...
            console.log("POSLAN KOD");
          },
          "expired-callback": () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
            console.log("ISTEKLO VRIJEME");
          },
        },
        auth
      );
      const registering = registerData.email
        ? await createUserWithEmailAndPassword(
            auth,
            registerData.email,
            registerData.password
          )
        : signInWithPhoneNumber(auth, registerData.number, phoneVerify)
            .then((success) => {
              console.log(success);
            })
            .catch((err) => {
              console.log(err);
            });
    } catch (err) {
      alert(err);
    }
  };
  return (
    <FormContainer>
      <Form onSubmit={register}>
        {message.value && (
          <p style={{ color: message.type == "error" ? "red" : "green" }}>
            {message.value}
          </p>
        )}

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
          type={showPassword ? "text" : "password"}
          value={registerData.password}
          onChange={handleInputChange}
        />

        {/** Date time picker */}
        <Input
          placeholder="Datum rodjenja"
          name="birthDate"
          type="date"
          value={registerData.birthDate}
          onChange={handleInputChange}
        />

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
