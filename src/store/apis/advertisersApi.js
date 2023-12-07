import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

// DEV ONLY!!!
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const advertisersApi = createApi({
  reducerPath: "advertisers",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
    fetchFn: async (...args) => {
      // REMOVE FOR PRODUCTION
      await pause(1000);
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      removeAdvertiser: builder.mutation({
        invalidatesTags: (result, error) => {
          return [{ type: "Advertisers" }];
        },
        query: (advertiser) => {
          return {
            url: `/advertisers/${advertiser.id}`,
            method: "DELETE",
          };
        },
      }),
      addAdvertiser: builder.mutation({
        invalidatesTags: (result, error, advertiser) => {
          return [{ type: "Advertisers" }];
        },
        query: (advertiser) => {
          return {
            url: "/advertisers",
            method: "POST",
            body: {
              name: faker.commerce.productName(),
            },
          };
        },
      }),
      fetchAdvertisers: builder.query({
        providesTags: (result, error) => {
          return [{ type: "Advertisers" }];
        },
        query: () => {
          return {
            url: "/advertisers",
            method: "GET",
          };
        },
      }),
    };
  },
});

export const {
  useFetchAdvertisersQuery,
  useAddAdvertiserMutation,
  useRemoveAdvertiserMutation,
} = advertisersApi;
export { advertisersApi };
