// src/redux/supportSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Async thunk for creating a new support ticket
// src/slices/supportSlice.js
export const createSupportTicket = createAsyncThunk(
  "support/createTicket",
  async ({ category, subject, userId }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5000/api/support", {
        client: "User",
        category,
        subject,
        opened: new Date(),
        status: "Open",
        userId, // ✅ correct field passed from frontend
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to create ticket");
    }
  }
);

const supportSlice = createSlice({
  name: "support",
  initialState: {
    loading: false,
    success: false,
    error: null,
    ticket: null,
  },
  reducers: {
    resetSupportState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.ticket = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSupportTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSupportTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.ticket = action.payload;
      })
      .addCase(createSupportTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetSupportState } = supportSlice.actions;
export default supportSlice.reducer;
