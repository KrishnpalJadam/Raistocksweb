import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Adjust API base URL if needed
const API_URL = "https://tradingapi-production-a52b.up.railway.app/api/market-insights";

// ========== Thunk: Fetch All Market Insights ==========
export const fetchMarketInsights = createAsyncThunk(
  "marketInsight/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data.data; // from { success, data: [...] }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch market insights"
      );
    }
  }
);

// ========== Slice ==========
const marketInsightSlice = createSlice({
  name: "marketInsight",
  initialState: {
    insights: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMarketInsights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMarketInsights.fulfilled, (state, action) => {
        state.loading = false;
        state.insights = action.payload || [];
      })
      .addCase(fetchMarketInsights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default marketInsightSlice.reducer;
