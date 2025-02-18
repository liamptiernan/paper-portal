import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { User } from "./types";

// Define a type for the slice state
interface UserState {
  rolesModalOpen: boolean;
  inviteModalOpen: boolean;
  activeEditUser?: User;
}

// Define the initial state using that type
const initialState: UserState = {
  rolesModalOpen: false,
  inviteModalOpen: false,
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setRolesModalOpen: (state, action: PayloadAction<boolean>) => {
      state.rolesModalOpen = action.payload;
    },
    setInviteModalOpen: (state, action: PayloadAction<boolean>) => {
      state.inviteModalOpen = action.payload;
    },
    setActiveEditUser: (state, action: PayloadAction<User>) => {
      state.activeEditUser = action.payload;
    },
  },
});

export const { setRolesModalOpen, setActiveEditUser, setInviteModalOpen } =
  userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const rolesModalOpen: (state: RootState) => boolean = (
  state: RootState
) => state.user.rolesModalOpen;

export const activeEditUser: (state: RootState) => User | undefined = (
  state: RootState
) => state.user.activeEditUser;

export const inviteModalOpen: (state: RootState) => boolean = (
  state: RootState
) => state.user.inviteModalOpen;

export default userSlice.reducer;
