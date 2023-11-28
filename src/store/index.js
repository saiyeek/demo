import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { advertisersReducer } from "./slices/advertisersSlice";
import { insertionOrdersApi } from "./apis/insertionOrdersApi";
import { lineItemsApi } from "./apis/lineItemsApi";

export const store = configureStore({
  reducer: {
    advertisers: advertisersReducer,
    [insertionOrdersApi.reducerPath]: insertionOrdersApi.reducer,
    [lineItemsApi.reducerPath]: lineItemsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(insertionOrdersApi.middleware)
      .concat(lineItemsApi.middleware);
  },
});

setupListeners(store.dispatch);

export * from "./thunks/fetchAdvertisers";
export * from "./thunks/addAdvertiser";
export * from "./thunks/removeAdvertiser";
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
