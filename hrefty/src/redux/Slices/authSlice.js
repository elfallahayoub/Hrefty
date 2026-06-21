import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });

      const response = await axios.post(
        "http://localhost:8000/api/register",
        userData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });
      const response = await axios.post(
        "http://localhost:8000/api/login",
        credentials,
        { withCredentials: true }
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/me");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("token");

      await axios.post(
        "http://localhost:8000/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: sessionStorage.getItem("user") || null,
    token: sessionStorage.getItem("token") || null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        sessionStorage.setItem("user", JSON.stringify(action.payload.user));
        sessionStorage.setItem("token", action.payload.token);
        action.payload.user.role == "client"
          ? (window.location.href = "/client_panel")
          : (window.location.href = "/technicien_panel");
        state.status = "succeeded";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        sessionStorage.setItem("user", JSON.stringify(action.payload.user));
        sessionStorage.setItem("token", action.payload.token);
        state.status = "succeeded";
        action.payload.user.role == "client"
          ? (window.location.href = "/client_panel")
          : (window.location.href = "/technicien_panel");
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        state.status = "idle";
        window.location.href = "/";
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        }
      );
  },
});

export default authSlice.reducer;
