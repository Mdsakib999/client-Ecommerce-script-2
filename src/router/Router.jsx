import { createBrowserRouter } from "react-router";
import App from "../App";
import About from "../pages/About";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import Checkout from "../pages/Checkout";
import ContactPage from "../pages/ContactPage";
import DashboardLayout from "../pages/Dashboard/DashboardLayout";
import AddProductPage from "../pages/Dashboard/admin/AddProductPage";
import ManageCategory from "../pages/Dashboard/admin/ManageCategory";
import ManageOrders from "../pages/Dashboard/admin/ManageOrders";
import ManageUsers from "../pages/Dashboard/admin/ManageUsers";
import Profile from "../pages/Dashboard/common/Profile";
import MyOrders from "../pages/Dashboard/customer/MyOrders";
import ErrorPage from "../pages/ErrorPage";
import Faq from "../pages/Faq";
import Home from "../pages/Home";
import ProductDetails from "../pages/Products/ProductDetails";
import Products from "../pages/Products/Products";
import withAuth from "../utils/withAuth";
import withPublic from "../utils/withPublic";
import ManageProducts from "../pages/Dashboard/admin/ManageProducts/ManageProducts";

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
        path: "/products",
        Component: Products,
      },
      {
        path: "/product/:id",
        Component: ProductDetails,
      },
      {
        path: "faq",
        Component: Faq,
      },
      {
        path: "checkout",
        Component: withAuth(Checkout),
      },
    ],
  },
  {
    path: "/dashboard/user",
    Component: withAuth(DashboardLayout, "CUSTOMER"),
    children: [
      // User routes
      { index: true, path: "profile", Component: Profile },
      { path: "orders", Component: MyOrders },
    ],
  },
  {
    path: "/dashboard/admin",
    Component: withAuth(DashboardLayout, "ADMIN"),
    children: [
      // Admin routes
      { index: true, path: "profile", Component: Profile },
      { path: "manage-orders", Component: ManageOrders },
      { path: "add-product", Component: AddProductPage },
      { path: "manage-category", Component: ManageCategory },
      { path: "manage-products", Component: ManageProducts },
      { path: "manage-users", Component: ManageUsers },
    ],
  },
  { path: "/login", Component: withPublic(Login) },
  { path: "/register", Component: withPublic(Register) },
]);

export default router;
