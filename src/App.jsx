import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/Signup/SignUp";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import Notfound from "./Pages/Notfound/Notfound";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import UserProvider from "./Components/Context/User.context";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import ShoppingCart from "./Pages/ShoppingCart/ShoppingCart";
import CartProvider from "./Components/Context/Cart.context";
import CheckOut from "./Pages/CheckOut/CheckOut";
import AllOrders from "./Pages/AllOrders/AllOrders";
import AllBrands from "./Pages/AllBrands/AllBrands";
import VerifyResetCode from "./Pages/VerifyResetCode/VerifyResetCode";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import WishList from "./Pages/WishList/WishList";
import WishlistProvider from "./Components/Context/Wishlist.context";
import AllProducts from "./Pages/AllProducts/AllProducts";
import { QueryClient, QueryClientProvider } from "react-query";
import LoadingProvider from "./Components/Context/Loading.context";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "/product/:id", element: <ProductDetails /> },
        { path: "/allbrands", element: <AllBrands /> },
        { path: "/cart", element: <ShoppingCart /> },
        { path: "/wishlist", element: <WishList /> },
        { path: "/checkout", element: <CheckOut /> },
        { path: "/allorders", element: <AllOrders /> },
        { path: "/allproducts", element: <AllProducts /> },
        { path: "*", element: <Notfound /> },
      ],
    },
    {
      path: "/auth",
      element: <Layout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "signup", element: <SignUp /> },
        { path: "forgetpassword", element: <ForgetPassword /> },
        { path: "verifyresetcode", element: <VerifyResetCode /> },
        { path: "resetpassword", element: <ResetPassword /> },
      ],
    },
  ]);

  const myClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={myClient}>
        <UserProvider>
          <CartProvider>
            <WishlistProvider>
              <LoadingProvider>
                <RouterProvider router={routes} />
              </LoadingProvider>
            </WishlistProvider>
          </CartProvider>
          <Toaster position="top-right" />
        </UserProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
