import React, { useContext, useEffect, useState } from "react";
import StarRateIcon from "@mui/icons-material/StarRate";
import { wishContext } from "../../Components/Context/Wishlist.context";
import { Link } from "react-router-dom";
import { cartContext } from "../../Components/Context/Cart.context";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { Helmet } from "react-helmet";
import Loading from "../../Components/Loading/Loading";
import { loadingContext } from "../../Components/Context/Loading.context";

export default function WishList() {
  const { wishInfo, removeProductFromWishlist } = useContext(wishContext);
  const { addProductToCart, isCartLoading } = useContext(cartContext);
  const { isLoading } = useContext(loadingContext);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   if (wishInfo?.data) {
  //     setIsLoading(false);
  //   } else {
  //     setIsLoading(true);
  //   }
  // }, [wishInfo]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>Wish List </title>
        <meta name="description" content="Welcome to Wish List page" />
      </Helmet>

      <section>
        <h2 className="text-primary mt-10 text-2xl font-semibold flex items-center gap-1">
          Wishlist Cart
          <FavoriteBorderOutlinedIcon
            className="text-red-600"
            fontSize="large"
          />
        </h2>
        <div className="grid grid-cols-12 gap-5 ">
          {wishInfo?.data?.length === 0 ? (
            <div className="bg-blue-50 py-16 mt-20 flex flex-col col-span-12 justify-center items-center">
              <h3 className="text-lg font-semibold mb-10">
                There are no items yet.
              </h3>
              <Link to="/" className="btn text-md">
                ADD YOUR FIRST PRODUCT TO CART
              </Link>
            </div>
          ) : (
            wishInfo.data?.map((item) => (
              <div
                key={item.id}
                className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 p-3 rounded-xl shadow-md "
              >
                <img
                  className="w-full object-cover"
                  src={item.imageCover}
                  alt="product Cover"
                />
                <div>
                  <h2 className="text-primary mt-2 font-semibold text-base line-clamp-1">
                    {item.title}
                  </h2>
                  <h3 className="text-gray-600 mt-1 font-semibold text-sm">
                    {item.category?.name}
                  </h3>
                </div>
                <div className="flex items-center mt-1 justify-between">
                  <h3 className="text-primary font-semibold text-sm">
                    {item.price} L.E
                  </h3>
                  <span className="flex text-sm items-center">
                    <StarRateIcon
                      fontSize="small"
                      className="text-yellow-500"
                    />
                    {item.ratingsAverage}
                  </span>
                </div>
                <div className="flex justify-center mt-4 gap-5">
                  <button
                    onClick={() => {
                      addProductToCart({ id: item.id });
                    }}
                    className="btn bg-gray-300 text-sm font-semibold rounded-lg px-3 py-2 transition-colors duration-300 "
                  >
                    {isCartLoading ? (
                      <CircularProgress size={"20px"} />
                    ) : (
                      <AddShoppingCartOutlinedIcon />
                    )}{" "}
                  </button>
                  <button
                    onClick={() => {
                      removeProductFromWishlist({ id: item.id });
                    }}
                    className="btn bg-gray-300 hover:bg-red-500 text-sm font-semibold rounded-lg px-3 py-2 transition-colors duration-300"
                  >
                    <CloseIcon />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}
