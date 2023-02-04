import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isAuth: false,
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };
    case "LOGIN":
      return {
        ...state,
        isAuth: action.isAuth,
        user: action.user,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuth: false,
        user: null,
      };
    default:
      return state;
  }
};

export const store = configureStore({
  reducer,
});
