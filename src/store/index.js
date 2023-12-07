import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from "@reduxjs/toolkit/query";
import { insertionOrdersApi } from "./apis/insertionOrdersApi";
import { lineItemsApi } from "./apis/lineItemsApi";
import { advertisersApi } from "./apis/advertisersApi";

export const store = configureStore({
  reducer: {
    [advertisersApi.reducerPath]: advertisersApi.reducer,
    [insertionOrdersApi.reducerPath]: insertionOrdersApi.reducer,
    [lineItemsApi.reducerPath]: lineItemsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(insertionOrdersApi.middleware)
      .concat(lineItemsApi.middleware)
      .concat(advertisersApi.middleware);
  },
});

setupListeners(store.dispatch);

export {
  useFetchAdvertisersQuery,
  useAddAdvertiserMutation,
  useRemoveAdvertiserMutation,
} from "./apis/advertisersApi";

export {
  useFetchInsertionOrdersQuery,
  useAddInsertionOrderMutation,
  useRemoveInsertionOrderMutation,
} from "./apis/insertionOrdersApi";
export {
  useFetchLineItemsQuery,
  useAddLineItemMutation,
  useRemoveLineItemMutation,
} from "./apis/lineItemsApi";
