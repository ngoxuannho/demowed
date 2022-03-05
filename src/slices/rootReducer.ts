import { combineReducers } from "@reduxjs/toolkit";
import { cartReducer } from "./cartSlice";
import { sneakersApi } from "./sneakersApi";
import { userReducer } from "./userSlice";
import storage from 'redux-persist/lib/storage';
import {
    persistReducer,
} from 'redux-persist';



export const rootReducer = combineReducers({
    cart: cartReducer,
    user: userReducer,
    [sneakersApi.reducerPath]: sneakersApi.reducer
});


export type RootState = ReturnType<typeof rootReducer>