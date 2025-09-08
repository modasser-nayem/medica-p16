import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { IAuthUser } from "@/types";

type TAuthState = {
   user: IAuthUser | null;
};

const initialState: TAuthState = { user: null };

const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      setUser: (state, action: PayloadAction<IAuthUser>) => {
         state.user = action.payload;
      },
      logout: (state) => {
         state.user = null;
      },
      updateUser: (state, action: PayloadAction<Partial<IAuthUser>>) => {
         if (state.user) {
            Object.assign(state.user, action.payload);
         }
      },
   },
});

export const { setUser, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;

export const selectedUser = (state: RootState) => state.auth.user;
