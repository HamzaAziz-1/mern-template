import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import counterReducer from "../features/counter/counterSlice";
import userReducer from "../features/user/userSlice";

const persistConfig = {
  key: "root",
  storage,
};

//To persist a specific reducer
const persistedReducer = persistReducer(persistConfig, userReducer);
// add more reducers here to persist them


const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: persistedReducer,
  },
});

export const persistor = persistStore(store);
export default store;
