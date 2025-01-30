import StarRateIcon from "@mui/icons-material/StarRate";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { cartContext } from "../Context/Cart.context";
import { wishContext } from "../Context/Wishlist.context";
import { Helmet } from "react-helmet";
import CircularProgress from "@mui/material/CircularProgress";

export default function ProductCart({ product }) {
  const { addProductToCart, isCartLoading } = useContext(cartContext);
  const { addProductToWishlist } = useContext(wishContext);

  return (
    <>
      <Helmet>
        <title>Product Cart</title>
        <meta name="description" content="Welcome to Products page" />
      </Helmet>
      <div
        className=" col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3
     p-2 rounded-xl transform transition-all shadow-md
      hover:shadow-xl mt-4 mb-4 lg:mt-0 border-2 border-transparent
       hover:border-blue-500 duration-300 overflow-hidden"
      >
        <img
          className="w-full object-cover"
          src={product.imageCover}
          alt={product.title}
        />

        <h2 className="font-bold text-lg text-center text-primary line-clamp-1">
          {product.title}
        </h2>

        <h3 className="font-semibold mt-1 text-xs text-center text-gray-500">
          {product.category?.name}
        </h3>

        <div className="flex items-center justify-between mt-4 mb-2">
          <h3 className="text-xs font-bold text-blue-500 mt-1">
            Price {product.price} L.E
          </h3>
          <span className="flex text-xs items-center">
            <StarRateIcon className="text-yellow-500" fontSize="small" />
            {product.ratingsAverage}
          </span>
        </div>

        <div className="mt-2 flex items-center gap-4">
          <span className="text-xs line-through opacity-75">
            {product.sold} Sold
          </span>
          <span
            className={`font-bold text-xs p-2 rounded-s-xl ${
              product.quantity > 200 ? "bg-green-300" : "bg-red-300"
            }`}
          >
            {product.quantity} Stock
          </span>
        </div>

        <p className="text-xs mt-2 mb-2 text-center text-gray-600 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-center gap-2 mb-3">
          <button
            onClick={() => addProductToCart({ id: product.id })}
            disabled={isCartLoading}
            className="px-2 py-2 font-semibold text-sm rounded-lg bg-gray-300 hover:bg-primary hover:text-white transition-colors duration-200 "
          >
            {isCartLoading ? (
              <CircularProgress size={"19px"} />
            ) : (
              <AddShoppingCartOutlinedIcon />
            )}
          </button>
          <Link
            to={`/product/${product.id}`}
            className="p-2 font-semibold text-sm bg-gray-300 rounded-lg hover:text-yellow-500"
            aria-label={`View details of ${product.title}`}
          >
            <VisibilityIcon fontSize="medium" />
          </Link>
          <button
            onClick={() => addProductToWishlist({ id: product.id })}
            className="p-2 font-semibold text-sm bg-gray-300 rounded-lg hover:text-red-500"
            aria-label="Favorite"
          >
            <FavoriteIcon fontSize="medium" />
          </button>
        </div>
      </div>{" "}
    </>
  );
}
