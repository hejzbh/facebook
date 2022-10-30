import { createSlice } from "@reduxjs/toolkit";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

export const FriendsSlice = createSlice({
  name: "user's friends",
  initialState: {
    friends: [],
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducers: {
    setFriends(state, action) {
      console.log(action);
      state.friends = action.payload.friends;
    },
    removeFriend(state, action) {
      const { payload } = action;
      // Get friends
      // Remove friend
      console.log("--------------------------😍-----------------");
      deleteDoc(
        doc(db, "users", payload.userID, "friends", payload.friendID)
      ).then((result) => {
        console.log(result);
        state.friends = state.friends.filter(
          (friend) => friend.id !== payload.friendID
        );
      });
    },
    addFriend(state, action) {
      const { payload } = action;
      // Add friend
      setDoc(doc(db, "users", payload.userID, "friends", payload.friendID), {
        id: payload.friendID,
      }).then((result) => {
        console.log(result);
        state.friends.push(payload.friendID);
      });
    },
  },
});

export const { setFriends, addFriend, removeFriend } = FriendsSlice.actions;

export default FriendsSlice.reducer;
