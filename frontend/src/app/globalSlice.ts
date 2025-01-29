import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// Define a type for the slice state
interface GlobalState {
  accountModalOpen: boolean;
}

// Define the initial state using that type
const initialState: GlobalState = {
  accountModalOpen: false,
};

export const globalSlice = createSlice({
  name: "global",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setAccountModalOpen: (state, action: PayloadAction<boolean>) => {
      state.accountModalOpen = action.payload;
    },
  },
});

export const { setAccountModalOpen } = globalSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const accountModalOpen: (state: RootState) => boolean = (
  state: RootState
) => state.global.accountModalOpen;

export default globalSlice.reducer;
