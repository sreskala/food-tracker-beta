import { configureStore } from '@reduxjs/toolkit'
import alertReducer from '../slices/alert/alertSlice'

export default configureStore({
  reducer: {
      alert: alertReducer
  },
})