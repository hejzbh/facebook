import { collection, getDocs, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase/firebaseConfig";
// Components
import { CreatePost } from "./CreatePost";
import { Post } from "./Post";
export const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    onSnapshot(collection(db, "posts"), (snapshot) => {
      const posts = snapshot.docs.map((doc) => doc.data());
      setPosts(posts);
    });
  }, []);

  return (
    <PostsContainer>
      <CreatePost />
      {/** Posts */}
      {posts.map((post) => (
        <Post post={post} />
      ))}
    </PostsContainer>
  );
};

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
