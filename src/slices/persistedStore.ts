import storage from "redux-persist/lib/storage";
import {
  persistReducer,
} from "redux-persist";
import { rootReducer } from "./rootReducer";

const persistConfig = {
  key: "cart",
  storage: storage,
  whitelist: ['cart']
};
export const persistedReducer = persistReducer(persistConfig, rootReducer );



