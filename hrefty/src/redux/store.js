import { configureStore } from "@reduxjs/toolkit";
import clientReducer from "./Slices/clientSlice";
import artisanReducer from "./Slices/artisanSlice";
import servicesReducer from "./Slices/pageServicesSlice";
import artisansReducer from "./Slices/pageArtisansSlice";
import authReducer from "./Slices/authSlice";
import chatReducer from "./Slices/chatSlice";
import adminReducer from "./Slices/adminSlice";
import profileReducer from "./Slices/profileSlice";

export const store = configureStore({
  reducer: {
    client: clientReducer,
    services: servicesReducer,
    artisans: artisansReducer,
    artisan: artisanReducer,
    auth: authReducer,
    chat: chatReducer,
    admin: adminReducer,
    profile: profileReducer,
  },
});
// mmmmmmmmmmm