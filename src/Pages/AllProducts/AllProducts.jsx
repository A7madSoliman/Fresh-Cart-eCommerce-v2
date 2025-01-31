import { useContext, useState } from "react";
import useProducts from "../../Components/Hooks/useProducts";
import { cartContext } from "../../Components/Context/Cart.context";
import { wishContext } from "../../Components/Context/Wishlist.context";
import StarRateIcon from "@mui/icons-material/StarRate";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import { Helmet } from "react-helmet";

export default function AllProducts() {
  const { addProductToCart } = useContext(cartContext);
  const { addProductToWishlist } = useContext(wishContext);
  const { data, error, isLoading: productsLoading } = useProducts();
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  const handleAddToCart = async (productId) => {
    setLoadingProductId(productId);
    await addProductToCart({ id: productId });
    setLoadingProductId(null);
  };

  const handleAddToWishList = async (productId) => {
    if (favoriteProducts.includes(productId)) {
      setFavoriteProducts((prev) => prev.filter((id) => id !== productId));
    } else {
      setFavoriteProducts((prev) => [...prev, productId]);
    }
    try {
      await addProductToWishlist({ id: productId });
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
    }
  };

  if (productsLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Helmet>
        <title>Products</title>
        <meta name="description" content="Welcome to Products page" />
      </Helmet>

      <div className="grid grid-cols-12 gap-5">
        {data?.data?.data.map((product) => (
          <div
            key={product.id}
            className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 p-2 rounded-xl transform transition-all shadow-md hover:shadow-xl mt-4 mb-4 lg:mt-0 border-2 border-transparent hover:border-blue-500 duration-300 overflow-hidden"
          >
            <img
              className="w-full object-cover"
              src={product.imageCover}
              alt={`Cover image for ${product.title}`}
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
                className={`font-bold text-xs p-2 rounded-l-xl ${
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
                onClick={() => handleAddToCart(product.id)}
                disabled={loadingProductId === product.id}
                className="px-2 py-2 font-semibold text-sm rounded-lg bg-gray-300 hover:bg-primary hover:text-white transition-colors duration-200"
              >
                {loadingProductId === product.id ? (
                  <CircularProgress size={"20px"} />
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
                onClick={() => handleAddToWishList(product.id)}
                className="p-2 font-semibold text-sm bg-gray-300 rounded-lg hover:text-red-500"
                aria-label={`Add ${product.title} to wishlist`}
              >
                <FavoriteIcon
                  fontSize="medium"
                  style={{
                    color: favoriteProducts.includes(product.id)
                      ? "red"
                      : "inherit",
                  }}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
