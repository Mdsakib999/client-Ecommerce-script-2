import { createBrowserRouter } from "react-router";
import App from "../App";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
<<<<<<< HEAD
import About from "../pages/About";
=======
import ProductDetails from "../pages/Products/ProductDetails";
>>>>>>> 7f2830a4f25632771239cf0ef38129ceb77a7804

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
        path:"about", 
        Component: About},
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
