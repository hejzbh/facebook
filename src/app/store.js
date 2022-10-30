import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/AuthSlice";
import FriendsSlice from "../features/friends/FriendsSlice";
import RequestesSlice from "../features/requestes/RequestesSlice";
import ActiveChatsSlice from "../features/active-chats/ActiveChatsSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    friends: FriendsSlice,
    requestes: RequestesSlice,
    activeChats: ActiveChatsSlice,
  },
});
