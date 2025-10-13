import { configureStore } from "@reduxjs/toolkit";
import crmAuthReducer from "../slices/crmAuthSlice";
import marketInsightReducer from "../slices/marketInsightSlice";

const store = configureStore({
  reducer: {
    crmAuth: crmAuthReducer,
        marketInsight: marketInsightReducer,

  },
});

export default store;
