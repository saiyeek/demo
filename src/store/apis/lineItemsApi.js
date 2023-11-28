import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

const lineItemsApi = createApi({
  reducerPath: "lineItems",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
  }),
  endpoints(builder) {
    return {
      fetchLineItems: builder.query({
        providesTags: (result, error, insertionOrder) => {
          const tags = result.map((lineItem) => {
            return { type: "LineItem", id: lineItem.id };
          });
          tags.push({ type: "InsertionOrderLineItem", id: insertionOrder.id });
          return tags;
        },
        query: (insertionOrder) => {
          return {
            url: "/lineItems",
            params: {
              insertionOrderId: insertionOrder.id,
            },
            method: "GET",
          };
        },
      }),
      addLineItem: builder.mutation({
        invalidatesTags: (result, error, insertionOrder) => {
          return [{ type: "InsertionOrderLineItem", id: insertionOrder.id }];
        },
        query: (insertionOrder) => {
          return {
            method: "POST",
            url: "/lineItems",
            body: {
              insertionOrderId: insertionOrder.id,
              url: faker.image.abstract(150, 150, true),
            },
          };
        },
      }),
      removeLineItem: builder.mutation({
        invalidatesTags: (result, error, lineItem) => {
          return [{ type: "LineItem", id: lineItem.id }];
        },
        query: (lineItem) => {
          return {
            method: "DELETE",
            url: `/lineItems/${lineItem.id}`,
          };
        },
      }),
    };
  },
});

export const {
  useFetchLineItemsQuery,
  useAddLineItemMutation,
  useRemoveLineItemMutation,
} = lineItemsApi;
export { lineItemsApi };
