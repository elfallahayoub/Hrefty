import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://127.0.0.1:8000/api";

export const artisansList = createAsyncThunk(
  "artisans/artisansList",
  async () => {
    const response = await axios.get(`${url}/artisan`);
    return response.data;
  }
);

const initialState = {
  listArtisans: [],
  filtredList: [],
  status: "",
};
const artisansSlider = createSlice({
  name: "artisans",
  initialState,
  reducers: {
    filterArtisans: (state, action) => {
      const { category, ville } = action.payload;

      state.filtredList = state.listArtisans.filter((artisan) => {
        const matchCategory = category
          ? artisan.specialite.nom === category
          : true;
        const matchVille = ville ? artisan.ville.includes(ville) : true;
        return matchCategory && matchVille;
      });
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(artisansList.pending, (state) => {
        state.status = "pending";
      })
      .addCase(artisansList.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.listArtisans = action.payload.data;
        state.filtredList = state.listArtisans
      })
      .addCase(artisansList.rejected, (state) => {
        state.status = "rejected";
      });
  },
});
export const { filterArtisans } = artisansSlider.actions;

export default artisansSlider.reducer;
