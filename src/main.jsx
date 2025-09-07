import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import router from "./router/Router.jsx";
import { RouterProvider } from "react-router/dom";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/app/store.js";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
      <Toaster />
    </ReduxProvider>
  </StrictMode>
);
