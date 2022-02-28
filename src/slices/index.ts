import { persistedReducer } from "./persistedStore";
import { sneakersApi } from "./sneakersApi";
import { configureStore, Action } from "@reduxjs/toolkit";
import { rootReducer, RootState } from "./rootReducer";
import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";
  import { persistStore } from "redux-persist";


export const storeData = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sneakersApi.middleware),
});

export const persistor = persistStore(storeData);


export type AppDispatch = typeof storeData.dispatch;
