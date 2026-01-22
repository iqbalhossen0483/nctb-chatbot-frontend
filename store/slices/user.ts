import { User } from "@/types/common";
import { createSlice } from "@reduxjs/toolkit";

type UserStore = {
  user: User | null;
  token: string | null;
  loading: boolean;
};

const user = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: null,
    loading: true,
  } as UserStore,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    removeToken: (state) => {
      state.token = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, logout, setToken, removeToken, setLoading } =
  user.actions;
export default user.reducer;
