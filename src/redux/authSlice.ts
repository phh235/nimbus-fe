import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    login(state, action) {
      state.user = action.payload
    },
    register(state, action) {
      state.user = action.payload
    },
    logout(state) {
      state.user = null
    },
  },
})

//  action
export const authActions = authSlice.actions

// reducer
export const { login, logout, register } = authSlice.actions
export default authSlice.reducer
