import { createSlice } from "@reduxjs/toolkit";

export const ActiveChatsSlice = createSlice({
  name: "user's active/opened chats",
  initialState: {
    activeChats: [],
  },
  reducers: {
    setActiveChats(state, action) {
      state.activeChats.push(action.payload.newChat);
    },
    removeActiveChat(state, action) {
      console.log(action);
      state.activeChats = state.activeChats.filter(
        (chat) => chat.id !== action.payload
      );
    },
  },
});

export const { setActiveChats, removeActiveChat } = ActiveChatsSlice.actions;

export default ActiveChatsSlice.reducer;
