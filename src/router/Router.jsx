import { createBrowserRouter } from "react-router";
import App from "../App";
import About from "../pages/About";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import AdminDashboard from "../pages/Dashboard/admin/AdminDashboard";
import UserDashboard from "../pages/Dashboard/customer/UserDashboard";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import ProductDetails from "../pages/Products/ProductDetails";
import ContactPage from "../pages/ContactPage";

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
        path: "/about",
        Component: About,
      },
      {
        path: "/contact",
        Component: ContactPage,
      },
      {
        path: "/product/:id",
        Component: ProductDetails,
      },
    ],
  },
  { path: "/login", Component: Login },
  { path: "/register", Component: Register },
  {
    path: "/dashboard/user",
    Component: UserDashboard,
  },
  {
    path: "/dashboard/admin",
    Component: AdminDashboard,
  },
]);

export default router;
