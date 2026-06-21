import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://127.0.0.1:8000/api";

export const technicienInfo = createAsyncThunk(
  "client/technicienInfo",
  async (id) => {
    const response = await axios.get(`${url}/artisan/${id}`);
    return response.data;
  }
);

export const offresList = createAsyncThunk("artisan/offresList", async () => {
  const response = await axios.get(`${url}/artisan`);
  return response.data;
});

export const addOffre = createAsyncThunk(
  "artisan/addOffre",
  async (formInputs) => {
    const now = new Date();
    const pad = (n) => n.toString().padStart(2, "0");
    const formattedDate = `${now.getFullYear()}-${pad(
      now.getMonth() + 1
    )}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(
      now.getMinutes()
    )}:${pad(now.getSeconds())}`;

    const formData = new FormData();
    formData.append("description", formInputs.description);
    formData.append("montant", +formInputs.montant);
    formData.append("idDemande", formInputs.idDemande);
    formData.append("statut", formInputs.statut);
    formData.append("idArtisan", formInputs.idArtisan);
    formData.append("dateCreation", formattedDate);
    console.log(formattedDate)
    const response = await axios.post(`${url}/offre`, formData);
    return response.data;
  }
);

export const demandesList = createAsyncThunk(
  "artisan/demandesList",
  async () => {
    const response = await axios.get(`${url}/demande`);
    return response.data;
  }
);
export const statistiques = createAsyncThunk(
  "artisan/statistiques",
  async (id) => {
    const response = await axios.post(`${url}/artisan/statistiques`, {
      artisanId: id,
    });
    return response.data;
  }
);

// export const addDemande = createAsyncThunk(
//   "client/addDemande",
//   async (formInputs) => {
//     const now = new Date();
//     const dateCreation = now.toISOString().slice(0, 19).replace('T', ' ');
//     const formData = new FormData();
//     formData.append("titre", formInputs.titre);
//     formData.append("description", formInputs.description);
//     formData.append("adresse", formInputs.adresse);
//     formData.append("budget", formInputs.budget);
//     formData.append("telephone", formInputs.telephone);
//     formData.append("photo", formInputs.photo);
//     formData.append("dateExecution", formInputs.dateExecution);
//     formData.append("dateCreation", dateCreation);
//     formData.append("status", formInputs.status);
//     formData.append("idClient", formInputs.idClient);
//     const response = await axios.post(`${url}/demande`, formData);
//     return response.data;
//   }
// );

const user = JSON.parse(sessionStorage.getItem("user"));

const initialState = {
  listOffres: [],
  listDemandes: [],
  statis: [],
  artisanInfo: user ? user : {},
  status: "",
  erreur: "",
};

const artisanSlider = createSlice({
  name: "artisan",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addOffre.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addOffre.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.listOffres = action.payload;
        window.location.href = '/technicien_panel'
      })
      .addCase(addOffre.rejected, (state) => {
        state.status = "rejected";
      })

      .addCase(technicienInfo.pending, (state) => {
        state.status = "pending";
      })
      .addCase(technicienInfo.fulfilled, (state, action) => {
        state.artisanInfo = action.payload.data;
      })
      .addCase(technicienInfo.rejected, (state) => {
        state.status = "rejected";
      })

      .addCase(demandesList.pending, (state) => {
        state.status = "pending";
      })
      .addCase(demandesList.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.listDemandes = action.payload.data;
      })
      .addCase(demandesList.rejected, (state) => {
        state.status = "rejected";
      })

      .addCase(statistiques.pending, (state) => {
        state.status = "pending";
      })
      .addCase(statistiques.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.statis = action.payload.data;
      })
      .addCase(statistiques.rejected, (state) => {
        state.status = "rejected";
      })

      .addCase(offresList.pending, (state) => {
        state.status = "pending";
      })
      .addCase(offresList.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.listOffres = action.payload.data;
      })
      .addCase(offresList.rejected, (state) => {
        state.status = "rejected";
      });
  },
});
export default artisanSlider.reducer;
