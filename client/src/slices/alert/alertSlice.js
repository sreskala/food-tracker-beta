import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

export const alertSlice = createSlice({
  name: "alert",
  initialState: {
    msg: "",
    alertType: "",
    id: null
  },
  reducers: {
    setAlert: (state, action) => {
      state.msg = action.payload.msg;
      state.alertType = action.payload.alertType;
      state.id = uuidv4();
    },
    removeAlert: (state) => {
      state.msg = "";
      state.alertType = "";
      state.id = null
    }
  },
});

export const { setAlert, removeAlert } = alertSlice.actions;

export default alertSlice.reducer;