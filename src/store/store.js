import { configureStore, combineReducers } from "@reduxjs/toolkit";
import crmAuthReducer from "../slices/crmAuthSlice";
import marketInsightReducer from "../slices/marketInsightSlice";
import marketPhaseReducer from "../slices/marketPhaseSlice";
import tradeActionsReducer from "../slices/tradeActionsSlice";
import marketTrendReducer from "../slices/marketTrendSlice";
import tradeReducer from "../slices/tradeSlice";
import researchReportReducer from "../slices/researchReportSlice";
import userTradeFormReducer from "../slices/userTradeFormSlice";
import tradeLogReducer from "../slices/tradeLogSlice";
import supportReducer from "../slices/supportSlice";
import clientAuthReducer from "../slices/clientAuthSlice";
import tradeSetupReducer from "../slices/tradeSetupSlice";
import marketSetupReducer from "../slices/marketSetupSlice";

const appReducer = combineReducers({
  crmAuth: crmAuthReducer,
  marketInsight: marketInsightReducer,
  marketPhase: marketPhaseReducer,
  tradeActions: tradeActionsReducer,
  marketTrend: marketTrendReducer,
  trades: tradeReducer,
  researchReports: researchReportReducer,
  userTradeForm: userTradeFormReducer,
  tradeLogs: tradeLogReducer,
  support: supportReducer,
  clientAuth: clientAuthReducer, 
      tradeSetup: tradeSetupReducer,
          marketSetup: marketSetupReducer,


});

const rootReducer = (state, action) => {
  if (action.type === "crm/logout/fulfilled") {
    // On logout, reset the state to its initial values
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;