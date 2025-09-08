import { createBrowserRouter } from "react-router";
import App from "../App";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import ProductDetails from "../pages/Products/ProductDetails";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
      },
      {
        path: "/product/:id",
        Component: ProductDetails
      }
    ],
  },
  { path: "/login", Component: Login },
  { path: "/register", Component: Register },
]);

export default router;
