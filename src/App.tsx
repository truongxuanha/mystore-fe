import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loader from "./components/Loader";
import About from "./components/Abouts";
import InforProduct from "./components/Products/ProductDetail";
import PrivateLayout from "./layouts/PrivateLayout";
import PublicLayout from "./layouts/PublicLayout";
import Profile from "./components/Profile";
import Admin from "./components/Auth/Admin";
import OrderView from "./components/Oders";
import AdminStaff from "./components/Auth/Admin/components/AdminStaff";
import AdminHome from "./components/Auth/Admin/components/AdminHome";
import AdminProduct from "./components/Auth/Admin/components/AdminProduct";
import AdminCustomer from "./components/Auth/Admin/components/AdminCustomer";
import AdminProvider from "./components/Auth/Admin/components/AdminProvider";
import AdminOrder from "./components/Auth/Admin/components/AdminBill";
import AdminBanner from "./components/Auth/Admin/components/AdminBanner";

const Home = lazy(() => import("./components/Home"));
const Cart = lazy(() => import("./components/Carts"));
const Error = lazy(() => import("./components/Error/Error"));
const Products = lazy(() => import("./components/Products"));
const Login = lazy(() => import("./components/Auth/Login"));
const Register = lazy(() => import("./components/Auth/Register"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/product",
        element: (
          <Suspense fallback={<Loader />}>
            <Products />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<Loader />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/register",
        element: (
          <Suspense fallback={<Loader />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "product/:slug",
        element: (
          <Suspense fallback={<Loader />}>
            <InforProduct />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<Loader />}>
            <Error />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <PrivateLayout />,
    children: [
      {
        path: "/cart",
        element: (
          <Suspense fallback={<Loader />}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "/profile",
        element: (
          <Suspense fallback={<Loader />}>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<Loader />}>
            <Error />
          </Suspense>
        ),
      },
      {
        path: "/order",
        element: (
          <Suspense fallback={<Loader />}>
            <OrderView />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <Suspense fallback={<Loader />}>
        <Admin />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <AdminHome />,
      },
      {
        path: "dashboard",
        element: <AdminHome />,
      },
      {
        path: "staff",
        element: <AdminStaff />,
      },
      {
        path: "product",
        element: <AdminProduct />,
      },
      {
        path: "provider",
        element: <AdminProvider />,
      },
      {
        path: "customer",
        element: <AdminCustomer />,
      },
      {
        path: "order",
        element: <AdminOrder />,
      },
      {
        path: "banner",
        element: <AdminBanner />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
