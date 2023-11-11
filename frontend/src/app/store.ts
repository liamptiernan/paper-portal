import { configureStore } from "@reduxjs/toolkit";
import publisherReducer from "../features/publisher-dashboard/publisherSlice";
import { publicationsApi } from "../features/publisher-dashboard/publications/publicationsApi";

export const store = configureStore({
  reducer: {
    publisher: publisherReducer,
    [publicationsApi.reducerPath]: publicationsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(publicationsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
