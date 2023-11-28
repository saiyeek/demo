import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

// DEV ONLY!!!
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const insertionOrdersApi = createApi({
  reducerPath: "insertionOrders",
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
      removeInsertionOrder: builder.mutation({
        invalidatesTags: (result, error, insertionOrder) => {
          return [{ type: "InsertionOrder", id: insertionOrder.id }];
        },
        query: (insertionOrder) => {
          return {
            url: `/insertionOrders/${insertionOrder.id}`,
            method: "DELETE",
          };
        },
      }),
      addInsertionOrder: builder.mutation({
        invalidatesTags: (result, error, advertiser) => {
          return [{ type: "AdvertisersInsertionOrders", id: advertiser.id }];
        },
        query: (advertiser) => {
          return {
            url: "/insertionOrders",
            method: "POST",
            body: {
              advertiserId: advertiser.id,
              title: faker.commerce.productName(),
            },
          };
        },
      }),
      fetchInsertionOrders: builder.query({
        providesTags: (result, error, advertiser) => {
          const tags = result.map((insertionOrder) => {
            return { type: "InsertionOrder", id: insertionOrder.id };
          });
          tags.push({ type: "AdvertisersInsertionOrders", id: advertiser.id });
          return tags;
        },
        query: (advertiser) => {
          return {
            url: "/insertionOrders",
            params: {
              advertiserId: advertiser.id,
            },
            method: "GET",
          };
        },
      }),
    };
  },
});

export const {
  useFetchInsertionOrdersQuery,
  useAddInsertionOrderMutation,
  useRemoveInsertionOrderMutation,
} = insertionOrdersApi;
export { insertionOrdersApi };
