import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,

  token: localStorage.getItem("usertoken")
    ? JSON.parse(localStorage.getItem("usertoken"))
    : null,
};

const authSliceUser = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    setUserCredentials: (state, action) => {
      state.userInfo = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
      localStorage.setItem("usertoken", JSON.stringify(action.payload.token));
    },
    userLogout: (state) => {
      state.userInfo = null;
      state.token = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setUserCredentials, userLogout } = authSliceUser.actions;
export default authSliceUser.reducer;
