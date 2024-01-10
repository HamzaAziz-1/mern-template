import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import counterReducer from "../features/counter/counterSlice";
import userReducer from "../features/user/userSlice";

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: persistedReducer,
  },
});

const persistor = persistStore(store);
export { store, persistor };
