import { configureStore } from "@reduxjs/toolkit";
import crmAuthReducer from "../slices/crmAuthSlice";
import marketInsightReducer from "../slices/marketInsightSlice";
import marketPhaseReducer from "../slices/marketPhaseSlice";

import marketTrendReducer from "../slices/marketTrendSlice";

const store = configureStore({
  reducer: {
    crmAuth: crmAuthReducer,
    marketInsight: marketInsightReducer,
    marketPhase: marketPhaseReducer,
    marketTrend: marketTrendReducer,
  },
});

export default store;
