import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { logoutUser } from "../../helpers/api";

export const logoutUserAsync = createAsyncThunk(
  "user/logoutUserAsync",
  async (_, { dispatch }) => {
    try {
      await logoutUser();
      dispatch(updateUser(null));
      toast.success("Logout Successfully");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  }
);

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
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    
  },
});

export const { saveUser, updateUser } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const selectIsLoading = (state) => state.isLoading;

export default userSlice.reducer;
