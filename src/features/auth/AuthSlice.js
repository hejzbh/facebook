import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
  name: "userAuth",
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      const { payload } = action.payload;
      console.log("login");
      console.log(payload);
      state.user = {
        uid: payload.uid,
        email: payload.email,
        displayName: payload.displayName,
        phoneNumber: payload.phoneNumber,
        photoURL: payload.photoURL,
      };
    },
    logout: (state) => {
      state.user = null;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout, updateUser } = AuthSlice.actions;
export const selectUser = (state) => state.auth.user;

export default AuthSlice.reducer;
