import { configureStore } from '@reduxjs/toolkit'
import alertReducer from '../slices/alert/alertSlice'
import authReducer from '../slices/auth/authSlice'

export default configureStore({
  reducer: {
      alert: alertReducer,
      auth: authReducer
  },
})