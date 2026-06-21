// src/features/chat/chatSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`, // ajuste selon ton auth
  },
});

export const fetchConversations = createAsyncThunk(
  "chat/fetchConversations",
  async () => {
    const response = await api.get("/conversations");
    return response.data;
    console.log(response.data);
  }
);

export const createConversation = createAsyncThunk(
  "chat/createConversation",
  async ({ idOffre }) => {
    const formatDateTime = (date) => {
      return date.toISOString().slice(0, 19).replace("T", " ");
    };

    const dateDebut = formatDateTime(new Date());
    const res = await api.post("/conversations", {
      idOffre,
      dateDebut:dateDebut,
    });
    return res.data;
  }
);

export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (conversationId) => {
    const res = await api.get(`/conversations/${conversationId}/messages`);
    return res.data;
  }
);

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (messageData) => {
    console.log(messageData);
    const res = await api.post("/messages", messageData);
    return res.data;
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    conversations: [],
    messages: [],
    selectedConversation: null,
  },
  reducers: {
    setSelectedConversation: (state, action) => {
      state.selectedConversation = action.payload;
      state.messages = [];
    },
    receiveMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.conversations = action.payload;
      })
      .addCase(createConversation.fulfilled, (state, action) => {
        state.conversations.unshift({
          ...action.payload,
        });
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      });
  },
});

export const { setSelectedConversation, receiveMessage } = chatSlice.actions;
export default chatSlice.reducer;
