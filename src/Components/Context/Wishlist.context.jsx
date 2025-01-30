import { createContext, useContext, useEffect, useState } from "react";
import { userContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";

export const wishContext = createContext([]);
export default function WishlistProvider({ children }) {
  const [wishInfo, setWishInfo] = useState([]);
  const { token } = useContext(userContext);

  async function getWishItems() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "GET",
        headers: {
          token,
        },
      };

      let { data } = await axios.request(options);
      console.log(data);
      setWishInfo(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function addProductToWishlist({ id }) {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "POST",
        headers: {
          token,
        },
        data: {
          productId: id,
        },
      };
      let { data } = await axios.request(options);
      setWishInfo(data);
      toast.success("Product added to wishlist");
      getWishItems();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function removeProductFromWishlist({ id }) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        method: "DELETE",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      console.log(data);

      if (data.length === 0) {
        setWishInfo([]);
      } else {
        setWishInfo(data);
      }

      getWishItems();
      toast.success("Product removed from wishlist");
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove product from wishlist");
    }
  }

  useEffect(() => {
    getWishItems();
  }, []);

  return (
    <wishContext.Provider
      value={{ wishInfo, addProductToWishlist, removeProductFromWishlist }}
    >
      {children}
    </wishContext.Provider>
  );
}
