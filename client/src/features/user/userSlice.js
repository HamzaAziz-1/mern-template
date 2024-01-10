import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../utils/config";

export const logoutUserAsync = createAsyncThunk(
  "user/logoutUserAsync",
  async (_, { dispatch }) => {
    try {
      await axios.delete(`${BASE_URL}/auth/logout`, {
        withCredentials: true,
      });
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
    logoutUser: async (state) => {
      try {
        await axios.delete(`${BASE_URL}/auth/logout`, {
          withCredentials: true,
        });
        state.user = null;
        state.isLoading = false;
        toast.success("Logout Successfully");
      } catch (error) {
        state.isLoading = false;
        toast.error(error?.response?.data?.msg);
      }
    },
  },
});

export const { saveUser, logoutUser, updateUser } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const selectIsLoading = (state) => state.isLoading;

export default userSlice.reducer;
