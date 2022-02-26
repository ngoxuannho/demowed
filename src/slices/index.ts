import { sneakersApi } from './sneakersApi';
import { configureStore } from "@reduxjs/toolkit";


export const storeData = configureStore({
    reducer: {
        [sneakersApi.reducerPath]: sneakersApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sneakersApi.middleware),
})