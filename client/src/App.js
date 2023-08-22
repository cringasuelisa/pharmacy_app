import React from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";
import Medicament from "./Components/Medicament";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Blog from "./pages/Blog";
import CheckoutApp from "./Components/Checkout";
import { CartProvider } from "./Context/CartContext";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Grafic from "./Components/Grafic";

const Layout = () => {
  return (
    <div>
      <Header />
      <ToastContainer
        position={"top-center"}
        autoClose={5000}
        transition={Flip}
        draggablePercent={30}
        toastStyle={{ backgroundColor: "#7bed81", color: "#ffffff" }}
      />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/medicament/:id",
        element: <Medicament />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path:"/grafic",
        element:<Grafic />
      },
      { path: "/checkout", element: <CheckoutApp /> },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <CartProvider>
        <RouterProvider router={router}>
          <Layout />
        </RouterProvider>
      </CartProvider>
    </div>
  );
}

export default App;
