import { cartReducer } from "./cartSlice";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";

interface iUser {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string | undefined;
  residence: string[];
  phone: number;
  request: string | undefined;
  agreement: boolean;
}

const initialState: iUser = {
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  apartment: "",
  residence: [""],
  phone: 0,
  request: "",
  agreement: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToUser: (_, { payload }: PayloadAction<iUser>) => {
      return payload;
    },
  },
});

export const { addToUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
