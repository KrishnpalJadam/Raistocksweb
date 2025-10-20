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
    loading: false,
    error: null,
  },
  reducers: {
    clearTradeActions: (state) => {
      state.actions = [];
      state.loading = false;
      state.error = null;
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
        // Add new actions to the existing ones, avoiding duplicates by ID
        const existingIds = new Set(state.actions.map((a) => a._id || a.id));
        const newActions = action.payload.filter(
          (a) => !existingIds.has(a._id || a.id)
        );
        state.actions = [...state.actions, ...newActions];
      })
      .addCase(fetchTradeActions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearTradeActions } = tradeActionsSlice.actions;
export default tradeActionsSlice.reducer;
