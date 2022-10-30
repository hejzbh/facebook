import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";

export const Post = ({ post }) => {
  return (
    <div className="p-4 rounded-2xl">
      <div>
        <h1>{post?.author?.displayName}</h1>
      </div>
      {post.text !== "" && (
        <div>
          <p>{post.text}</p>
        </div>
      )}

      {post.images.map((image) => (
        <img src={image} style={{ width: "100%" }} />
      ))}
    </div>
  );
};
