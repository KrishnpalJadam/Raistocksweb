import { configureStore } from "@reduxjs/toolkit";
import crmAuthReducer from "../slices/crmAuthSlice";

const store = configureStore({
  reducer: {
    crmAuth: crmAuthReducer,
  },
});

export default store;
