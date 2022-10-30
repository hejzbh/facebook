import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
// Icons
import { FaLocationArrow } from "react-icons/fa";
import { addDoc, deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { arrayUnion } from "firebase/firestore";

export const SendMessageInput = ({ chatID }) => {
  const user = useSelector((state) => state.auth.user);
  const [isTypingSent, setIsTypingSent] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  // Chat message
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!msg) return;

    const startTypingEffect = async () => {
      if (!isTyping) {
        await setDoc(doc(db, "chats", chatID, "typing", user.uid), {
          typing: true,
          photo: user.photoURL,
        }).then((res) => setIsTyping(true));
        return;
      }

      setTimeout(async () => {
        await deleteDoc(doc(db, "chats", chatID, "typing", user.uid)).then(
          (res) => setIsTyping(false)
        );
      }, 2000);
    };
    startTypingEffect();
  }, [msg]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (msg === "") return;

    await updateDoc(doc(db, "chats", chatID), {
      messages: arrayUnion({
        message: msg,
        sender: user,
      }),
    });
  };

  return (
    <InputContainer onSubmit={sendMessage}>
      <Input value={msg} onChange={(e) => setMsg(e.target.value)} />
      <SendMessageBTN type="submit">
        <FaLocationArrow />
      </SendMessageBTN>
    </InputContainer>
  );
};

// Style
const InputContainer = styled.form`
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  left: 0;
  right: 0;
`;

const Input = styled.input`
  border: 0;
  outline: 0;
  padding: 0.5em;
  background: transparent;
  width: 100%;
`;

const SendMessageBTN = styled.button`
  border: 0;
  outline: 0;
  padding: 0.5em;
  cursor: pointer;
`;
