import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Loader from "./components/Loader";
import About from "./components/Abouts";
import InforProduct from "./components/Products/ProductDetail";
import PrivateLayout from "./layouts/PrivateLayout";
import PublicLayout from "./layouts/PublicLayout";
import Profile from "./components/Profile";
import Admin from "./components/Auth/Admin";
import OrderView from "./components/Oders";
import AdminStaff from "./components/Auth/Admin/AdminStaff";
import AdminProduct from "./components/Auth/Admin/AdminProduct";
import AdminProvider from "./components/Auth/Admin/AdminProvider";
import AdminOrder from "./components/Auth/Admin/AdminOrder";
import AdminBanner from "./components/Auth/Admin/AdminBanner";
import AuthPage from "components/Auth/AuthPage";
import MeAccountPage from "components/Profile/MeAccountPage";
import ChangePasswordProfile from "components/Profile/ChangePassword";
import MyAdress from "components/Profile/MyAdress";
import MyPurchase from "components/Profile/MyPurchase";
import ProtectecRoute from "layouts/ProtectecRoute";
import AdminHome from "components/Auth/Admin/AdminHome";
import AdminCustomer from "components/Auth/Admin/AdminCustomer";
import AdminPopup from "components/Auth/Admin/AdminPopup";

const Home = lazy(() => import("./components/Home"));
const Cart = lazy(() => import("./components/Carts"));
const Error = lazy(() => import("./components/Error/Error"));
const Products = lazy(() => import("./components/Products"));
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
        path: "/product/product-detail/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <InforProduct />
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
            <ProtectecRoute>
              <AuthPage />
            </ProtectecRoute>
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
        path: "/account",
        element: (
          <Suspense fallback={<Loader />}>
            <Profile />
          </Suspense>
        ),
        children: [
          {
            path: "profile",
            element: <MeAccountPage />,
          },
          {
            path: "password",
            element: <ChangePasswordProfile />,
          },
          {
            path: "address",
            element: <MyAdress />,
          },
          {
            path: "purchase",
            element: <MyPurchase />,
          },
        ],
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
        element: <Navigate to="/admin/dashboard" />,
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
      {
        path: "popup",
        element: <AdminPopup />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
