import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/AuthContext";
import { PersistGate } from "redux-persist/integration/react";
import store from "./app/store";
import { Provider } from "react-redux";
import {persistor} from './app/store.js'
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* <AppProvider> */}
            <App />
          {/* </AppProvider> */}
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
