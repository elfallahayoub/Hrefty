import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://127.0.0.1:8000/api";

export const demandesList = createAsyncThunk(
  "services/servicesList",
  async () => {
    const response = await axios.get(`${url}/demande`);
    return response.data;
  }
);

export const categoryList = createAsyncThunk(
  "services/categoryList",
  async () => {
    const response = await axios.get(`${url}/specialite`);
    return response.data;
  }
);

const initialState = {
  listServices: [],
  listCategorys: [],
  filtredList: [],
  status: "",
};
const servicesSlider = createSlice({
  name: "services",
  initialState,
  reducers: {
    filterServices: (state, action) => {
      const { category, ville } = action.payload;
      state.filtredList = state.listServices.filter((service) => {
        const matchCategory = category
          ? service.category.nom === category
          : true;
        const matchVille = ville ? service.client.ville.includes(ville) : true;
        return matchCategory && matchVille;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(demandesList.pending, (state) => {
        state.status = "pending";
      })
      .addCase(demandesList.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.listServices = action.payload.data;
      })
      .addCase(demandesList.rejected, (state) => {
        state.status = "rejected";
      })

      .addCase(categoryList.pending, (state) => {
        state.status = "pending";
      })
      .addCase(categoryList.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.listCategorys = action.payload.data;
        state.filtredList = state.listServices
      })
      .addCase(categoryList.rejected, (state) => {
        state.status = "rejected";
      });
  },
});
export const { filterServices } = servicesSlider.actions;

export default servicesSlider.reducer;
