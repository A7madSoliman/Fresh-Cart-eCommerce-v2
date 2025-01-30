import { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import { wishContext } from "./Wishlist.context";
import { cartContext } from "./Cart.context";

export const loadingContext = createContext("");
export default function LoadingProvider({ children }) {
  const { wishInfo } = useContext(wishContext);
  const { cartInfo } = useContext(cartContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (wishInfo?.data && cartInfo) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [wishInfo, cartInfo]);

  return (
    <loadingContext.Provider value={{ isLoading }}>
      {children}
    </loadingContext.Provider>
  );
}
