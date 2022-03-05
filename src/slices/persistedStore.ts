import storage from "redux-persist/lib/storage";
import {
  persistReducer,
} from "redux-persist";
import { rootReducer } from "./rootReducer";

const persistConfig = {
  key: "local",
  storage: storage,
  whitelist: ['cart', 'user']
};
export const persistedReducer = persistReducer(persistConfig, rootReducer );



