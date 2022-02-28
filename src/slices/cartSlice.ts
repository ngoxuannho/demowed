import { message } from "antd";
import { RootState } from "./rootReducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iCart } from "../utils/addToCart";
import Item from "antd/lib/list/Item";

const initialState: iCart[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartSlice: (cart, { payload }: PayloadAction<iCart>) => {
      console.log("im work");
      if (cart.length > 0) {
        const payloadAlreadyExsisted = cart.some((product: iCart) => {
          return product.id === payload.id;
        });
        if (payloadAlreadyExsisted) {
          const index = cart.findIndex((product: iCart) => {
            return product.id === payload.id;
          });
          message.success("Cart updated");
          cart.splice(index, 1, payload);
        } else {
          message.success("Product added");
          return [...cart, payload];
        }
      } else {
        message.success(" 🎉🎉 First Item 🥳🥳 ");
        return [payload];
      }
    },
    delFromCartSlice: (cart, { payload }: PayloadAction<iCart>) => {
      return cart.filter((item: iCart) => item.id !== payload.id);
    },
  },
});

export const { addToCartSlice, delFromCartSlice } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
