import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const listTechniciens = createAsyncThunk(
  "admin/listTechniciens",
  async () => {
    const response = await axios.get("http://localhost:8000/api/artisan");
    return response.data;
  }
);
export const listDemandes = createAsyncThunk("admin/listDemandes", async () => {
  const response = await axios.get("http://localhost:8000/api/demande");
  return response.data;
});
export const updateTechnicien = createAsyncThunk(
  "admin/updateTechnicien",
  async (info) => {
    const response = await axios.put(
      `http://localhost:8000/api/artisan/${info.id}`,
      { status: info.status }
    );
    return response.data;
  }
);
export const deleteTechnicien = createAsyncThunk(
  "admin/deleteTechnicien",
  async (id) => {
    const response = await axios.delete(
      `http://localhost:8000/api/artisan/${id}`
    );
    return response.data;
  }
);
export const deleteDemande = createAsyncThunk(
  "admin/deleteDemande",
  async (id) => {
    const response = await axios.delete(
      `http://localhost:8000/api/demande/${id}`
    );
    return response.data;
  }
);
export const deleteOffre = createAsyncThunk("admin/deleteOffre", async (id) => {
  const response = await axios.delete(`http://localhost:8000/api/offre/${id}`);
  return response.data;
});
export const addAds = createAsyncThunk("admin/addAds", async (formData) => {
  const response = await axios.post("http://localhost:8000/api/ads", formData);
  return response.data;
});
export const updateAds = createAsyncThunk(
  "admin/updateAds",
  async ({ id, etat }) => {
    const data = {
      actif: etat == "actif" ? true : false,
    };
    const response = await axios.put(
      `http://localhost:8000/api/ads/${id}`,
      data
    );
    return response.data.data;
  }
);

export const deleteAds = createAsyncThunk("admin/deleteAds", async (id) => {
  const response = await axios.delete(`http://localhost:8000/api/ads/${id}`);
  return response.data;
});
export const listAds = createAsyncThunk("admin/listAds", async () => {
  const response = await axios.get("http://localhost:8000/api/ads");
  return response.data;
});

const initialState = {
  TechniciensProfiles: [],
  demandeOffres: [],
  ads: [],
  status: "",
  erreur: "",
};
const adminSlider = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listDemandes.pending, (state) => {
        state.status = "pending";
      })
      .addCase(listDemandes.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.demandeOffres = action.payload.data.filter(
          (demande) => demande.status == "en_attente"
        );
      })
      .addCase(listDemandes.rejected, (state) => {
        state.status = "rejected";
      })

      .addCase(listTechniciens.pending, (state) => {
        state.status = "pending";
      })
      .addCase(listTechniciens.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.TechniciensProfiles = action.payload.data.filter(
          (technicien) => technicien.status == "inactif"
        );
      })
      .addCase(listTechniciens.rejected, (state) => {
        state.status = "rejected";
      })

      .addCase(addAds.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addAds.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.ads.push(action.payload.data);
        window.location.href = "/admin_panel";
      })
      .addCase(addAds.rejected, (state, action) => {
        state.status = "rejected";
      })

      .addCase(listAds.pending, (state) => {
        state.status = "pending";
      })
      .addCase(listAds.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.ads = action.payload.data;
      })
      .addCase(listAds.rejected, (state) => {
        state.status = "rejected";
      })

      .addCase(updateAds.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateAds.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.ads = state.ads.map((ad) =>
          ad.link === action.payload.link && ad.image === action.payload.image
            ? action.payload
            : ad
        );
      })
      .addCase(updateAds.rejected, (state) => {
        state.status = "rejected";
      })

      .addCase(deleteAds.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteAds.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.ads = state.ads.filter((ad) => ad.id !== action.payload.data.id);
      })
      .addCase(deleteAds.rejected, (state) => {
        state.status = "rejected";
      })

      .addCase(updateTechnicien.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateTechnicien.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.TechniciensProfiles = state.TechniciensProfiles.map(
          (technicien) =>
            technicien.id === action.payload.id ? action.payload : technicien
        );
      })
      .addCase(updateTechnicien.rejected, (state) => {
        state.status = "rejected";
      })

      .addCase(deleteDemande.pending, (state) => {
        state.status = "pending";
      })
      //   .addCase(deleteDemande.fulfilled, (state, action) => {
      //     state.status = "fulfilled";
      //     state.demandeOffres = state.demandeOffres.filter((demande) =>
      //       demande.id === action.payload.id ? action.payload : demande
      //     );
      //   })
      .addCase(deleteDemande.rejected, (state) => {
        state.status = "rejected";
      })

      .addCase(deleteTechnicien.pending, (state) => {
        state.status = "pending";
      })
      //   .addCase(deleteDemande.fulfilled, (state, action) => {
      //     state.status = "fulfilled";
      //     state.demandeOffres = state.demandeOffres.filter((demande) =>
      //       demande.id === action.payload.id ? action.payload : demande
      //     );
      //   })
      .addCase(deleteTechnicien.rejected, (state) => {
        state.status = "rejected";
      })

      .addCase(deleteOffre.pending, (state) => {
        state.status = "pending";
      })
      //   .addCase(deleteDemande.fulfilled, (state, action) => {
      //     state.status = "fulfilled";
      //     state.demandeOffres = state.demandeOffres.filter((demande) =>
      //       demande.id === action.payload.id ? action.payload : demande
      //     );
      //   })
      .addCase(deleteOffre.rejected, (state) => {
        state.status = "rejected";
      });
  },
});
export default adminSlider.reducer;
