import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null
    },
    reducers: {
        registerUser: (state, action) => {
            localStorage.setItem('token', action.payload.token);
            state.isAuthenticated = true;
            state.loading = false;
        },
        registerFail: (state) => {
            localStorage.removeItem('token');
            state.token = null;
            state.isAuthenticated = false;
            state.loading = false;
        }
    },
});

export const { registerUser, registerFail } = authSlice.actions;
export default authSlice.reducer;