import { configureStore } from "@reduxjs/toolkit";
import crmAuthReducer from "../slices/crmAuthSlice";
import marketInsightReducer from "../slices/marketInsightSlice";
import marketPhaseReducer from "../slices/marketPhaseSlice";
import tradeActionsReducer from "../slices/tradeActionsSlice";

import marketTrendReducer from "../slices/marketTrendSlice";
import tradeReducer from "../slices/tradeSlice";
import researchReportReducer from "../slices/researchReportSlice";

const store = configureStore({
  reducer: {
    crmAuth: crmAuthReducer,
    marketInsight: marketInsightReducer,
    marketPhase: marketPhaseReducer,
    tradeActions: tradeActionsReducer,
    marketTrend: marketTrendReducer,
    trades: tradeReducer,
    researchReports: researchReportReducer, // ✅ key matches selector in component
  },
});

export default store;
