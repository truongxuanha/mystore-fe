export const BASE_API = process.env.REACT_APP_URL_API_AUTHqq;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader";
import About from "./components/Abouts";
import InforProduct from "./components/products/ProductDetail";
import AppLayout from "./layouts/AppLayout";
import axios from "axios";

const Home = lazy(() => import("./components/Home/Home"));
const Cart = lazy(() => import("./components/cart/Cart"));
const Error = lazy(() => import("./pages/Error"));
const Products = lazy(() => import("./components/products"));
const Login = lazy(() => import("./components/Auth/Login"));
const Register = lazy(() => import("./components/Auth/Register"));

axios.create({
  baseURL: "https://some-domain.com/api/",
});

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
        element: <InforProduct />,
      },
      {
        path: "*",
        element: <Error />,
      },
      // {
      //   path: "/tim-kiem",
      //   element: <SearchResults />,
      // },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
