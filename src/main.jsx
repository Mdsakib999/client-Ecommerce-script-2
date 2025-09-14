import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import router from "./router/Router.jsx";
import { RouterProvider } from "react-router/dom";
import { Provider as ReduxProvider } from "react-redux";
import { persistor, store } from "./redux/app/store.js";
import { Toaster } from "react-hot-toast";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
        <Toaster />
      </PersistGate>
    </ReduxProvider>
  </StrictMode>
);
