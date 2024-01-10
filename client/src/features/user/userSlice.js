import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoading: true,
  },
  reducers: {
    saveUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    removeUser: (state) => {
      state.user = null;
      state.isLoading = false;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { saveUser, removeUser, updateUser } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const selectIsLoading = (state) => state.isLoading;

export default userSlice.reducer;
