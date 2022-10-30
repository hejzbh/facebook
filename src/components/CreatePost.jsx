import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
// Components
import { Button } from "./Button";
// images
import noProfilePhoto from "../images/noProfilePhoto.jpg";
// Icons
import { FaFileImage } from "react-icons/fa";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../firebase/firebaseConfig";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

export const CreatePost = () => {
  const user = useSelector((state) => state.auth.user);
  const filePicker = useRef();
  const [showForm, setShowForm] = useState(false);
  const [post, setPost] = useState({
    author: user,
    text: "",
    images: [],
  });

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && !files[0].type.startsWith("image")) {
      alert("Nije format slike");
      return;
    }

    setPost((post) => {
      return {
        ...post,
        [name]: type == "file" ? [...post.images, files[0]] : value,
      };
    });
  };

  const toggleForm = () => setShowForm((prev) => !prev);

  const pickImage = () => {
    filePicker.current.click();
  };

  const uploadPost = async (e) => {
    e.preventDefault();
    try {
      let images = [];
      if (post.images.length > 0) {
        const uploading = await new Promise((resolve, reject) => {
          post.images.map((image) => {
            const storageRef = ref(storage, "posts/", image.name);
            uploadBytesResumable(storageRef, image)
              .then((result) => getDownloadURL(result.ref))
              .then((postImageDownloadURL) => {
                images.push(postImageDownloadURL);
                if (images.length === post.images.length) resolve();
              });
          });
        });
      }

      await addDoc(collection(db, "posts"), {
        ...post,
        images,
      });
    } catch (err) {
      throw err;
    }
  };

  return (
    <CreatePostContainer>
      <UserImage src={user.photoURL || noProfilePhoto} />
      {showForm || post.text !== "" || post.images.length > 0 ? (
        <CreatePostForm onSubmit={uploadPost}>
          {/** For text */}
          <TextArea
            rows={8}
            name="text"
            value={post.text}
            onChange={handleInputChange}
          />
          {/** Submit */}
          <Button
            type="submit"
            title="Add post"
            disabled={!post.text && !post.images}
          />
        </CreatePostForm>
      ) : (
        <Button onClick={toggleForm} title="Add a post" stretch={true} />
      )}
      {/** Image picker */}
      <FilePickerBTN>
        <FaFileImage color="black" fontSize={18} onClick={pickImage} />
        <input
          type="file"
          name="images"
          onChange={handleInputChange}
          className="hidden"
          ref={filePicker}
        />
      </FilePickerBTN>
    </CreatePostContainer>
  );
};

const CreatePostContainer = styled.div`
  padding: 1.5em;
  border-radius: 18px;
  box-shadow: 8px 4px -12px 4px rgba(000, 000, 000, 0.3);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FilePickerBTN = styled.button`
  border: 0;
  padding: 1.5em;
  border-radius: 18px;
  outline: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  box-shadow: 8px 4px -12px 4px rgba(000, 000, 000, 0.3);
`;

const UserImage = styled.img`
  width: 100%;
  max-width: 60px;
  border-radius: 50%;
`;

const CreatePostForm = styled.form`
  width: 100%;
  margin: 0 2em;
`;

const TextArea = styled.textarea`
  border: 0;
  width: 100%;
  resize: none;
  border: 0;
  outline: 0;
  padding: 2em;
`;
