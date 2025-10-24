// src/slices/tradeSetupSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
const TRADE_SETUP_API = `${API_BASE}/api/tradesetup`;

// Thunk to fetch Trade Setup feed
export const fetchTradeSetup = createAsyncThunk(
  "tradeSetup/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(TRADE_SETUP_API);
      if (!response.ok) throw new Error("Failed to fetch Trade Setup feed");
      const data = await response.json();
      return data.data; // ✅ return the array only
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
const tradeSetupSlice = createSlice({
  name: "tradeSetup",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTradeSetup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTradeSetup.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTradeSetup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default tradeSetupSlice.reducer;
