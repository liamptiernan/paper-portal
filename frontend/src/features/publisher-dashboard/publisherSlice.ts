import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

// Define a type for the slice state
interface PublisherState {
  publicationFormOpen: boolean;
}

// Define the initial state using that type
const initialState: PublisherState = {
  publicationFormOpen: false,
};

export const publisherSlice = createSlice({
  name: "publisher",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setPublicationFormOpen: (state, action: PayloadAction<boolean>) => {
      state.publicationFormOpen = action.payload;
    },
  },
});

export const { setPublicationFormOpen } = publisherSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const publicationFormOpen: (state: RootState) => boolean = (
  state: RootState
) => state.publisher.publicationFormOpen;

export default publisherSlice.reducer;
