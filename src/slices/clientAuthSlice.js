// src/slices/clientAuthSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true; // 👈 ensures cookies are sent automatically

// ✅ Base API URL from environment variables (works with Vite)
const API_URL = import.meta.env.VITE_API_URL;

export const loginClient = createAsyncThunk(
  "clientAuth/loginClient",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/client/auth/login`, // ✅ use env variable
        { email },
        { withCredentials: true }
      );

      return response.data.client; // ✅ only need the client data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

export const logoutClient = createAsyncThunk(
  "clientAuth/logoutClient",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(
        `${API_URL}/client/auth/logout`,
        {},
        { withCredentials: true }
      );
      return true;
    } catch (error) {
      return rejectWithValue("Logout failed");
    }
  }
);

const clientAuthSlice = createSlice({
  name: "clientAuth",
  initialState: { client: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginClient.fulfilled, (state, action) => {
        state.loading = false;
        state.client = action.payload;
      })
      .addCase(loginClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutClient.fulfilled, (state) => {
        state.client = null;
      });
  },
});

export default clientAuthSlice.reducer;
