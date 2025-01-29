import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

interface PurchaseFormSlice {
  activeStep: number;
}

const initialState: PurchaseFormSlice = {
  activeStep: 0,
};

export const purchaseFormSlice = createSlice({
  name: "purchaseForm",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setActiveStep: (state, action: PayloadAction<number>) => {
      state.activeStep = action.payload;
    },
    incrementActiveStep: (state) => {
      state.activeStep = state.activeStep + 1;
    },
    decrementActiveStep: (state) => {
      if (state.activeStep > 0) {
        state.activeStep = state.activeStep - 1;
      }
    },
  },
});

export const { setActiveStep, incrementActiveStep, decrementActiveStep } =
  purchaseFormSlice.actions;

export const getActiveStep: (state: RootState) => number = (state: RootState) =>
  state.purchaseForm.activeStep;

export default purchaseFormSlice.reducer;
