import { createSlice } from "@reduxjs/toolkit";
import { fetchAdvertisers } from "../thunks/fetchAdvertisers";
import { addAdvertiser } from "../thunks/addAdvertiser";
import { removeAdvertiser } from "../thunks/removeAdvertiser";

const advertisersSlice = createSlice({
  name: "advertisers",
  initialState: {
    isLoading: false,
    data: [],
    error: null,
  },
  extraReducers(builder) {
    builder.addCase(fetchAdvertisers.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAdvertisers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchAdvertisers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    builder.addCase(addAdvertiser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addAdvertiser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
    });
    builder.addCase(addAdvertiser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    builder.addCase(removeAdvertiser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(removeAdvertiser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.filter((advertiser) => {
        return advertiser.id !== action.payload.id;
      });
    });
    builder.addCase(removeAdvertiser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const advertisersReducer = advertisersSlice.reducer;
