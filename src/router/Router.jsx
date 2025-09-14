import { createBrowserRouter } from "react-router";
import App from "../App";
import About from "../pages/About";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import ContactPage from "../pages/ContactPage";
import DashboardLayout from "../pages/Dashboard/DashboardLayout";
import ManageOrders from "../pages/Dashboard/admin/ManageOrders";
import ManageProducts from "../pages/Dashboard/admin/ManageProducts";
import ManageUsers from "../pages/Dashboard/admin/ManageUsers";
import Profile from "../pages/Dashboard/common/Profile";
import Checkout from "../pages/Checkout";
import MyOrders from "../pages/Dashboard/customer/MyOrders";
import ErrorPage from "../pages/ErrorPage";
import Faq from "../pages/Faq";
import Home from "../pages/Home";
import ProductDetails from "../pages/Products/ProductDetails";
import Products from "../pages/Products/Products";
import AddProduct from "../pages/Dashboard/admin/AddProduct";
import ManageCategory from "../pages/Dashboard/admin/ManageCategory";
import AddProductPage from "../pages/Dashboard/admin/AddProductPage";

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
    ],
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      // User routes
      {
        path: "profile",
        Component: Profile,
      },
      { path: "orders", Component: MyOrders },


      // Admin routes
      { path: "manage-orders", Component: ManageOrders },
      {path: "add-product", Component: AddProductPage},
      {path: "manage-category", Component: ManageCategory},
      { path: "manage-products", Component: ManageProducts },
      { path: "manage-users", Component: ManageUsers },
      {
        path: "checkout",
        Component: Checkout,
      },
    ],
  },
  { path: "/login", Component: Login },
  { path: "/register", Component: Register },
]);

export default router;
