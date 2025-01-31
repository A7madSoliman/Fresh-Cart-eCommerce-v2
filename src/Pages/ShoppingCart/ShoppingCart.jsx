import React, { useContext, useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import { cartContext } from "../../Components/Context/Cart.context";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { Helmet } from "react-helmet";
import CircularProgress from "@mui/material/CircularProgress";

export default function ShoppingCart() {
  const {
    cartInfo,
    removeProductFromCart,
    updateCartProductQuantity,
    clearUserCart,
    isCartLoading,
  } = useContext(cartContext);

  const isCartEmpty = cartInfo.length === 0;

  const handleIncreaseQuantity = (product) => {
    const newQuantity = product.count + 1;
    updateCartProductQuantity({
      id: product.product.id,
      count: newQuantity,
    });
  };

  const handleDecreaseQuantity = (product) => {
    const newQuantity = product.count - 1;
    if (newQuantity > 0) {
      updateCartProductQuantity({
        id: product.product.id,
        count: newQuantity,
      });
    } else {
      removeProductFromCart({ id: product.product.id });
    }
  };

  return (
    <>
      <Helmet>
        <title>Shopping Cart</title>
        <meta name="description" content="Welcome to Shopping Cart page" />
      </Helmet>

      <section className="mt-10 container max-w-full">
        <h2 className="text-primary text-2xl font-semibold flex items-center gap-1">
          Shopping Cart <ShoppingCartIcon color="inherit" fontSize="large" />
        </h2>

        {isCartEmpty ? (
          <div className="bg-blue-50 py-16 mt-20 flex flex-col justify-center items-center">
            <h3 className="text-lg font-semibold mb-10">
              There are no items yet.
            </h3>
            <Link to="/" className="btn text-md">
              ADD YOUR FIRST PRODUCT TO CART
            </Link>
          </div>
        ) : (
          cartInfo.data.products.map((product) => (
            <div
              key={product._id}
              className=" p-5 grid grid-cols-12 rounded-xl gap-5 mt-3 bg-blue-50"
            >
              <img
                className="w-36 col-span-2 rounded-md object-cover"
                src={product.product.imageCover}
                alt="Image Cover"
              />

              <div className=" col-span-10 ">
                <div>
                  <h2 className="text-lg font-semibold">
                    {product.product.brand.name}
                  </h2>
                  <h3 className="text-sm text-gray-700 font-bold mt-2 ">
                    {product.product.category.name}
                  </h3>
                </div>
                <div className="flex items-center justify-between mt-5 ">
                  <h4 className="text-lg font-semibold  text-primary ">
                    Price: {product.price} L.E
                  </h4>

                  <div className="flex items-center gap-4">
                    {isCartLoading ? (
                      <CircularProgress size={"19px"} />
                    ) : (
                      <RemoveCircleOutlineIcon
                        onClick={() => handleDecreaseQuantity(product)}
                        className="hover:text-primary cursor-pointer"
                        fontSize="medium"
                      />
                    )}
                    <span className="font-bold text-xl">{product.count}</span>
                    {isCartLoading ? (
                      <CircularProgress size={"19px"} />
                    ) : (
                      <AddCircleOutlineIcon
                        onClick={() => handleIncreaseQuantity(product)}
                        className="hover:text-primary cursor-pointer"
                        fontSize="medium"
                      />
                    )}
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        removeProductFromCart({ id: product.product.id });
                      }}
                      className="font-bold flex hover:text-red-500 ms-auto"
                    >
                      <DeleteIcon fontSize="medium" />
                      Remove Items
                    </button>
                  </div>
                </div>
                <h4 className="text-lg font-semibold mt-5  text-red-700 ">
                  SubTotal: {product.price * product.count} L.E
                </h4>
              </div>
            </div>
          ))
        )}

        {!isCartEmpty ? (
          <>
            <div className="bg-gray-200 rounded-lg shadow-md p-5 mt-4">
              <h2 className="mb-4 text-xl text-primary text-center font-bold ">
                Total Cart Price : {cartInfo.data.totalCartPrice} L.E
              </h2>
              <div className="flex justify-between">
                <button
                  onClick={clearUserCart}
                  className="btn bg-red-400 text-sm hover:bg-red-500 "
                >
                  Reset Cart
                </button>
                <div className="flex">
                  <Link
                    to="/checkout"
                    className="btn text-sm"
                    aria-label="Proceed to next step"
                  >
                    Check Out <ArrowForwardIosIcon fontSize="small" />
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </section>
    </>
  );
}
