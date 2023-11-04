import { configureStore } from "@reduxjs/toolkit";
import publisherReducer from "../features/publisher-dashboard/publisherSlice";

export const store = configureStore({
  reducer: {
    publisher: publisherReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
