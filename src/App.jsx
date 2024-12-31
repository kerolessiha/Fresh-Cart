import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Layout from "./components/Layout/Layout";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import UserProvider from "./Context/User.context";
import GuestRoute from "./components/GuestRoute/GuestRoute";
import CartProvider from "./Context/Cart.context";
import Cart from "./pages/Cart/Cart";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Checkout from "./pages/CheckOut/Checkout";
import Orders from "./pages/Orders/Orders";
import Notfoundpage from "./pages/Notfound/Notfoundpage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          {" "}
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        { path: "/Cart", element: <Cart /> },
        { path: "/product/:id", element: <ProductDetails /> },
        { path: "/Category/:id", element: <h2>Category</h2> },
        { path: "Checkout", element: <Checkout /> },
        { path: "allorders", element: <Orders /> },
      ],
    },
    {
      path: "/",
      element: (
        <GuestRoute>
          <Layout />
        </GuestRoute>
      ),
      children: [
        { path: "Login", element: <Login /> },
        { path: "Signup", element: <Signup /> },
      ],
    },
    {
      path: "*",
      element: <Notfoundpage />,
    },
  ]);
  const myCient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={myCient}>
        <UserProvider>
          <CartProvider>
            {" "}
            <RouterProvider router={router} />
          </CartProvider>
        </UserProvider>
        <Toaster />
      </QueryClientProvider>
    </>
  );
}

export default App;
