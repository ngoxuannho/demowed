import { message } from "antd";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iCart } from "../utils/addToCart";
const initialState: iCart[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartSlice: (cart, { payload }: PayloadAction<iCart>) => {
      if (cart.length > 0) {
        const payloadAlreadyExsisted = cart.some((product: iCart) => {
          return product.id === payload.id;
        });
        if (payloadAlreadyExsisted) {
          const index = cart.findIndex((product: iCart) => {
            return product.id === payload.id;
          });
          const qtyUnchange = cart[index].qty == payload.qty;
          const optionsUnchange =
            cart[index].options == payload.options &&
            cart[index].size == payload.size;
          if (qtyUnchange && optionsUnchange && cart[index].qty <= 10) {
            const increasedQty = { ...cart[index], qty: cart[index].qty + 1 };
            console.log(increasedQty);
            cart.splice(index, 1, increasedQty);
            message.success("Increase quantity ++");
            return;
          }
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
      message.error("Deleted");
      return cart.filter((item: iCart) => item.id !== payload.id);
    },
    delAll: () => [],
  },
});

export const { addToCartSlice, delFromCartSlice, delAll } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
