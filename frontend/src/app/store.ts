import { configureStore } from "@reduxjs/toolkit";
import publisherReducer from "../features/publisher-dashboard/publisherSlice";
import userReducer from "../features/users/usersSlice";
import globalReducer from "./globalSlice";
import { publicationsApi } from "../features/publisher-dashboard/publications/publicationsApi";
import { usersApi } from "../features/users/usersApi";
import { purchaseFormApi } from "../features/portal-form/purchaseFormApi";

export const store = configureStore({
  reducer: {
    publisher: publisherReducer,
    user: userReducer,
    global: globalReducer,
    [publicationsApi.reducerPath]: publicationsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [purchaseFormApi.reducerPath]: purchaseFormApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(publicationsApi.middleware)
      .concat(usersApi.middleware)
      .concat(purchaseFormApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
