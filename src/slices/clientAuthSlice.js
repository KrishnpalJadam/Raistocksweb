// src/slices/clientAuthSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/client/auth"; // adjust if needed

// --- Login ---
export const loginClient = createAsyncThunk(
  "clientAuth/loginClient",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5000/api/client/auth/login", { email });
      localStorage.setItem("clientToken", response.data.token);
      localStorage.setItem("client", JSON.stringify(response.data.client));
      return response.data.client;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed. Please try again.");
    }
  }
);

// --- Logout ---
export const logoutClient = createAsyncThunk("clientAuth/logoutClient", async () => {
  localStorage.removeItem("clientToken");
  localStorage.removeItem("client");
  return null;
});

const initialState = {
  client: JSON.parse(localStorage.getItem("client")) || null,
  token: localStorage.getItem("clientToken") || null,
  loading: false,
  error: null,
};

const clientAuthSlice = createSlice({
  name: "clientAuth",
  initialState,
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
        state.error = null;
      })
      .addCase(loginClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutClient.fulfilled, (state) => {
        state.client = null;
        state.token = null;
      });
  },
});

export default clientAuthSlice.reducer;
