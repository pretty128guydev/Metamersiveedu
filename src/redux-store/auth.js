import { createSlice } from "@reduxjs/toolkit";
import {
  readLoggedIn,
  readUserInfo,
  deleteLoggedIn,
  deleteUserInfo,
  persistLoggedIn,
  persistUserInfo,
} from "../utils/localStorage.service";

const initialState = {
  isLoggedIn: readLoggedIn(),
  userInfo: JSON.parse(readUserInfo()),
};

const { actions, reducer } = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = { ...state.userInfo, ...action.payload };
      persistLoggedIn("true");
      persistUserInfo(JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userInfo = undefined;
      deleteLoggedIn();
      deleteUserInfo();
    },
  },
});

export { actions as authActions, reducer };
