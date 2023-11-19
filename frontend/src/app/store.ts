import { configureStore } from "@reduxjs/toolkit";
import publisherReducer from "../features/publisher-dashboard/publisherSlice";
import globalReducer from "./globalSlice";
import { publicationsApi } from "../features/publisher-dashboard/publications/publicationsApi";

export const store = configureStore({
  reducer: {
    publisher: publisherReducer,
    global: globalReducer,
    [publicationsApi.reducerPath]: publicationsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(publicationsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
