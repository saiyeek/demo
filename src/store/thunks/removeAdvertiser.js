import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const removeAdvertiser = createAsyncThunk(
  "advertisers/remove",
  async (advertiser) => {
    await axios.delete(`http://localhost:3005/advertisers/${advertiser.id}`);

    return advertiser;
  }
);

export { removeAdvertiser };
