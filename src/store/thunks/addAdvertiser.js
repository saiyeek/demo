import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { faker } from "@faker-js/faker";

const addAdvertiser = createAsyncThunk("advertisers/add", async () => {
  const response = await axios.post("http://localhost:3005/advertisers", {
    name: faker.name.fullName(),
  });

  return response.data;
});

export { addAdvertiser };
