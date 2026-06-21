import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://127.0.0.1:8000/api";

export const lastArtisans = createAsyncThunk(
  "client/lastArtisans",
  async () => {
    const response = await axios.get(`${url}/demande`);
    return response.data;
  }
);

export const demandesList = createAsyncThunk(
  "client/demandesList",
  async () => {
    const response = await axios.get(`${url}/demande`);
    return response.data;
  }
);

export const addDemande = createAsyncThunk(
  "client/addDemande",
  async (formInputs) => {
    const now = new Date();
    const dateCreation = now.toISOString().slice(0, 19).replace("T", " ");
    const formData = new FormData();
    formData.append("titre", formInputs.titre);
    formData.append("description", formInputs.description);
    formData.append("adresse", formInputs.adresse);
    formData.append("ville", formInputs.ville);
    formData.append("category", +formInputs.category);
    formData.append("budget", +formInputs.budget);
    formData.append("telephone", formInputs.telephone);
    formData.append("photo", formInputs.photo);
    formData.append("dateExecution", formInputs.dateExecution);
    // formData.append("dateCreation", dateCreation);
    formData.append("status", formInputs.status);
    formData.append("idClient", formInputs.idClient);
    console.log(formInputs);
    const response = await axios.post(`${url}/demande`, formData);
    return response.data;
  }
);

export const updateOffre = createAsyncThunk(
  "client/updateOffre",
  async ({ idOffre, statut, idDemande }) => {
    if (statut == "acceptable") {
      await axios.put(`${url}/offre/${idOffre}`, { statut });
      await axios.put(`${url}/demande/${idDemande}`, { status: "en_cours" });
    } else {
      await axios.put(`${url}/offre/${idOffre}`, { statut });
    }
    return;
  }
);
const user = JSON.parse(sessionStorage.getItem("user"));

const initialState = {
  listDemandes: [],
  lastArtisans: [],
  clientInfo: {
    id: user?.client?.id || null,
  },
  status: "",
  erreur: "",
};

const clientSlider = createSlice({
  name: "client",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addDemande.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addDemande.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.listDemandes = action.payload;
        window.location.href = "/client_panel";
      })
      .addCase(addDemande.rejected, (state) => {
        state.status = "rejected";
      })

      .addCase(updateOffre.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateOffre.fulfilled, (state, action) => {
        state.status = "fulfilled";
        window.location.href = "/client_panel";
      })
      .addCase(updateOffre.rejected, (state) => {
        state.status = "rejected";
      })

      .addCase(lastArtisans.pending, (state) => {
        state.status = "pending";
      })
      .addCase(lastArtisans.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.lastArtisans = [];
        action.payload.data.forEach((demande) => {
          if (demande.idClient === state.clientInfo.id) {
            demande.offres.forEach((offre) => {
              if (offre.statut === "acceptable") {
                const exists = state.lastArtisans.some(
                  (artisan) => artisan.id === offre.artisan.id
                );
                if (!exists) {
                  state.lastArtisans.push(offre.artisan);
                }
              }
            });
          }
        });
      })
      .addCase(lastArtisans.rejected, (state) => {
        state.status = "rejected";
      })

      .addCase(demandesList.pending, (state) => {
        state.status = "pending";
      })
      .addCase(demandesList.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.listDemandes = [];
        action.payload.data.forEach((demande) => {
          if (demande.idClient === state.clientInfo.id) {
            state.listDemandes.push(demande);
          }
        });
      })
      .addCase(demandesList.rejected, (state) => {
        state.status = "rejected";
      });
  },
});
export default clientSlider.reducer;
