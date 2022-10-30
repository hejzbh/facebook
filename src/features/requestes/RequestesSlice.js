import { createSlice } from "@reduxjs/toolkit";

export const RequestesSlice = createSlice({
  name: "user's friends",
  initialState: {
    requestes: {
      sentFriendRequestes: [],
      recievedFriendRequestes: [],
    },
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducers: {
    setSentFriendRequestes(state, action) {
      state.requestes.sentFriendRequestes = action.payload.requestes;
    },
    setRecievedFriendsRequestes(state, action) {
      state.requestes.recievedFriendRequestes = action.payload.requestes;
    },
  },
});

export const { setSentFriendRequestes, setRecievedFriendsRequestes } =
  RequestesSlice.actions;

export default RequestesSlice.reducer;
