import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_API_URL;

// ✅ Fetch all trade actions for a specific trade
export const fetchTradeActions = createAsyncThunk(
  "tradeActions/fetchAll",
  async (tradeId, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/api/trade-actions/${tradeId}`);

      if (!res.ok) {
        throw new Error("Failed to fetch trade actions");
      }

      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const tradeActionsSlice = createSlice({
  name: "tradeActions",
  initialState: {
    actions: [],
    // keep actionsByTrade to store arrays keyed by tradeId to avoid collisions
    actionsByTrade: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearTradeActions: (state) => {
      state.actions = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTradeActions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTradeActions.fulfilled, (state, action) => {
        state.loading = false;
        // action.meta.arg contains the tradeId passed to the thunk
        const tradeId = action.meta?.arg;
        if (tradeId) {
          state.actionsByTrade[tradeId] = action.payload;
        }
        // also keep the flat actions array for compatibility
        state.actions = action.payload;
      })
      .addCase(fetchTradeActions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearTradeActions } = tradeActionsSlice.actions;
export default tradeActionsSlice.reducer;
