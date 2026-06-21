import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://127.0.0.1:8000/api";

export const technicienInfo = createAsyncThunk(
  "profile/technicienInfo",
  async (id) => {
    const response = await axios.get(`${url}/artisan/${id}`);
    return response.data;
  }
);

export const moyenne = createAsyncThunk("profile/moyenne", async (id) => {
  const response = await axios.post(`${url}/evaluation/moyenne`, {
    userId: id,
  });
  return response.data;
});

export const addEvaluation = createAsyncThunk(
  "profile/addEvaluation",
  async (formInputs) => {
    const now = new Date();
    const pad = (n) => n.toString().padStart(2, "0");
    const formattedDate = `${now.getFullYear()}-${pad(
      now.getMonth() + 1
    )}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(
      now.getMinutes()
    )}:${pad(now.getSeconds())}`;
    console.log({
      note: +formInputs.note,
      comment: formInputs.comment,
      idClient: +formInputs.idClient,
      idArtisan: +formInputs.idArtisan,
      dateCreation: formattedDate,
    });
    const response = await axios.post(`${url}/evaluation`, {
      note: +formInputs.note,
      comment: formInputs.comment,
      idClient: formInputs.idClient,
      idArtisan: formInputs.idArtisan,
      dateCreation: formattedDate,
    });

    return response.data;
  }
);

export const evaluationsList = createAsyncThunk(
  "profile/evaluationsList",
  async () => {
    const response = await axios.get(`${url}/evaluation`);
    return response.data;
  }
);

const initialState = {
  listEvaluations: [],
  technicienInfo: {},
  moyenne: 0,
  status: "",
  erreur: "",
};

const profileSlider = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addEvaluation.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addEvaluation.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.listEvaluations = action.payload;
        window.location.reload();
      })
      .addCase(addEvaluation.rejected, (state) => {
        state.status = "rejected";
      })

      .addCase(moyenne.pending, (state) => {
        state.status = "pending";
      })
      .addCase(moyenne.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.moyenne = action.payload.data;
      })
      .addCase(moyenne.rejected, (state) => {
        state.status = "rejected";
      })

      .addCase(technicienInfo.pending, (state) => {
        state.status = "pending";
      })
      .addCase(technicienInfo.fulfilled, (state, action) => {
        state.technicienInfo = action.payload.data;
      })
      .addCase(technicienInfo.rejected, (state) => {
        state.status = "rejected";
      })

      .addCase(evaluationsList.pending, (state) => {
        state.status = "pending";
      })
      .addCase(evaluationsList.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.listEvaluations = action.payload.data;
      })
      .addCase(evaluationsList.rejected, (state) => {
        state.status = "rejected";
      });

    //   .addCase(offresList.pending, (state) => {
    //     state.status = "pending";
    //   })
    //   .addCase(offresList.fulfilled, (state, action) => {
    //     state.status = "fulfilled";
    //     state.listOffres = action.payload.data;
    //   })
    //   .addCase(offresList.rejected, (state) => {
    //     state.status = "rejected";
    //   });
  },
});
export default profileSlider.reducer;
