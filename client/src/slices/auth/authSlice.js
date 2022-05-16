import { createSlice } from "@reduxjs/toolkit";
import setAuthToken from "../../utils/setAuthToken";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    loading: true,
    user: null,
  },
  reducers: {
    registerUser: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
    },
    registerFail: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    loadUser: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.loading = false;
    },
    loadUserFail: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    loginUser: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
    },
    loginFail: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    logout: (state) => {
        localStorage.removeItem("token");
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
    }
  },
});

export const {
  registerUser,
  registerFail,
  loadUser,
  loadUserFail,
  loginUser,
  loginFail,
  logout
} = authSlice.actions;
export default authSlice.reducer;
