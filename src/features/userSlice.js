import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.currentUser = null;
      state.token = null;
    },
    updateUser: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
  },
});

export const selectCurrentUser = (state) => state.user.currentUser;
export const selectToken = (state) => state.user.token;

export const { login, logout, updateUser } = userSlice.actions;
export default userSlice.reducer;
