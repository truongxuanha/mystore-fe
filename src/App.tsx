import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loader from "./components/Loader";
import About from "./components/Abouts";
import InforProduct from "./components/products/ProductDetail";
import AppLayout from "./layouts/AppLayout";

const Home = lazy(() => import("./components/Home/Home"));
const Cart = lazy(() => import("./components/cart"));
const Error = lazy(() => import("./components/Error/Error"));
const Products = lazy(() => import("./components/products"));
const Login = lazy(() => import("./components/Auth/Login"));
const Register = lazy(() => import("./components/Auth/Register"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
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
        path: "/san-pham",
        element: (
          <Suspense fallback={<Loader />}>
            <Products />
          </Suspense>
        ),
      },
      {
        path: "/lien-he",
        element: (
          <Suspense fallback={<Loader />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/gio-hang",
        element: (
          <Suspense fallback={<Loader />}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "/dang-nhap",
        element: (
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/dang-ky",
        element: (
          <Suspense fallback={<Loader />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "san-pham/:slug",
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
