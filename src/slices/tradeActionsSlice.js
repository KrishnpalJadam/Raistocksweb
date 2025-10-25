import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = import.meta.env.VITE_API_URL;

// ✅ Fetch all trade actions globally
export const fetchAllTradeActions = createAsyncThunk(
  "tradeActions/fetchAllGlobal",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/api/trade-actions`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error(`Failed to fetch all trade actions (${res.status})`);
      const data = await res.json();

      let actions = [];
      if (Array.isArray(data)) actions = data;
      else if (Array.isArray(data.data)) actions = data.data;
      else if (Array.isArray(data.actions)) actions = data.actions;

      return actions;
    } catch (error) {
      console.error("fetchAllTradeActions Error:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTradeActions = createAsyncThunk(
  "tradeActions/fetchByTrade",
  async (tradeId, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/api/trade-actions/${tradeId}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch trade actions");
      const data = await res.json();
      return Array.isArray(data) ? data : data.data || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const tradeActionsSlice = createSlice({
  name: "tradeActions",
  initialState: { actions: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTradeActions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllTradeActions.fulfilled, (state, action) => {
        state.loading = false;
        state.actions = action.payload || [];
      })
      .addCase(fetchAllTradeActions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTradeActions.fulfilled, (state, action) => {
        state.loading = false;
        const payloadArray = Array.isArray(action.payload)
          ? action.payload
          : [];
        const existingIds = new Set(state.actions.map((a) => a._id || a.id));
        const newActions = payloadArray.filter(
          (a) => !existingIds.has(a._id || a.id)
        );
        state.actions = [...state.actions, ...newActions];
      });
  },
});

export default tradeActionsSlice.reducer;
