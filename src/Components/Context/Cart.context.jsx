import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { userContext } from "./User.context";
import toast from "react-hot-toast";

export const cartContext = createContext(null);

export default function CartProvider({ children }) {
  const [cartInfo, setCartInfo] = useState([]);
  const [isCartLoading, setIsCartLoading] = useState(false);
  const { token } = useContext(userContext);

  useEffect(() => {
    if (token) {
      getLoggedUserCart();
    }
  }, [token]);

  async function getLoggedUserCart() {
    setIsCartLoading(true);
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart`,
        method: "GET",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      if (data.numOfCartItems === 0) {
        setCartInfo([]);
      } else {
        setCartInfo(data);
      }
    } catch (error) {
      console.error("Error fetching user cart:", error);
    } finally {
      setIsCartLoading(false);
    }
  }

  async function addProductToCart({ id }) {
    setIsCartLoading(true);

    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart`,
        method: "POST",
        headers: {
          token,
        },
        data: {
          productId: id,
        },
      };
      let { data } = await axios.request(options);
      toast.success(data.message, { duration: 1000 });
      await getLoggedUserCart();
      console.log(data);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Failed to add product to cart. Please try again.");
    } finally {
      setIsCartLoading(false);
    }
  }

  async function removeProductFromCart({ id }) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        method: "DELETE",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      toast.success("Removed From Cart Successfully");
      if (data.numOfCartItems === 0) {
        setCartInfo([]);
      } else {
        setCartInfo(data);
      }
    } catch (error) {
      console.error("Error removing product from cart", error);
      toast.error("Failed to remove product from cart. Please try again.");
    } finally {
      setIsCartLoading(false);
    }
  }

  async function updateCartProductQuantity({ id, count }) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        method: "PUT",
        headers: {
          token,
        },
        data: {
          count,
        },
      };
      let { data } = await axios.request(options);
      setCartInfo(data);
    } catch (error) {
      console.error("Error removing product from cart", error);
    }
  }

  async function clearUserCart() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "DELETE",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      if (data.message === "success") {
        setCartInfo([]);
      }
    } catch (error) {
      console.error("Error clearing product from cart", error);
    }
  }

  return (
    <cartContext.Provider
      value={{
        addProductToCart,
        getLoggedUserCart,
        removeProductFromCart,
        updateCartProductQuantity,
        clearUserCart,
        isCartLoading,
        cartInfo,
        setCartInfo,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
