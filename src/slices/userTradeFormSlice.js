// src/redux/slices/userTradeFormSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tradeForm: {
    selectedTrade: null,
    yourEntry: "",
    yourExit: "",
    quantity: "",
  },
  loggedTrades: [],
};

const userTradeFormSlice = createSlice({
  name: "tradeForm",
  initialState,
  reducers: {
    // ✅ store form field values as user types
    setTradeFormField: (state, action) => {
      const { field, value } = action.payload;
      state.tradeForm[field] = value;
    },

    // ✅ store selected trade object (dropdown)
    setSelectedTrade: (state, action) => {
      state.tradeForm.selectedTrade = action.payload;
    },

    // ✅ add a new trade log entry when form is submitted
    addTradeLog: (state, action) => {
      state.loggedTrades.unshift(action.payload); // add to top
    },

    // ✅ clear form after submitting
    resetTradeForm: (state) => {
      state.tradeForm = {
        selectedTrade: null,
        yourEntry: "",
        yourExit: "",
        quantity: "",
      };
    },
  },
});

export const {
  setTradeFormField,
  setSelectedTrade,
  addTradeLog,
  resetTradeForm,
} = userTradeFormSlice.actions;

export default userTradeFormSlice.reducer;
