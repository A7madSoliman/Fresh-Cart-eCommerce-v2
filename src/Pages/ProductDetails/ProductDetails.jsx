import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarRateIcon from "@mui/icons-material/StarRate";
import Loading from "../../Components/Loading/Loading";
import ReactImageGallery from "react-image-gallery";
import { cartContext } from "../../Components/Context/Cart.context";
import { Helmet } from "react-helmet";

export default function ProductDetails() {
  const [details, setDetails] = useState(null);
  const { addProductToCart } = useContext(cartContext);

  let { id } = useParams();

  async function getProductsDetails() {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      setDetails(data.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  }

  useEffect(() => {
    getProductsDetails();
  }, [id]);

  const imagesItems = details
    ? details.images.map((imgURL) => {
        return {
          original: imgURL,
          thumbnail: imgURL,
        };
      })
    : [];

  return (
    <>
      {details === null ? (
        <Loading />
      ) : (
        <>
          <Helmet>
            <title> {details.title}</title>
            <meta name="description" content="Welcome to home page" />
          </Helmet>

          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-5">
              <ReactImageGallery items={imagesItems} autoPlay={true} />
            </div>
            <div className="col-span-7 mt-16">
              <h1 className="text-gray-800 text-xl font-bold">
                {details.brand.name}
              </h1>
              <h2 className="text-primary font-semibold mt-2 text-xl">
                {details.title}
              </h2>
              <h3 className="text-2xl font-bold mt-2">
                {details.category.name}
              </h3>
              <p className="text-gray-700 mt-6 ">{details.description}</p>
              <h3 className="mt-2 text-blue-300 font-semibold ">
                Price {details.price} L.E
              </h3>

              <div className="mt-2 flex justify-between items-center">
                <span className="flex items-center gap-1">
                  <StarRateIcon className="text-yellow-500" fontSize="small" />
                  {details.ratingsAverage}
                </span>
                <h5>
                  <span className="line-through">{details.sold}</span> Sold Out
                </h5>
                <h6 className="font-semibold text-sm p-2 bg-yellow-300 rounded-s-2xl">
                  {details.quantity} Stock
                </h6>
              </div>
              <button
                onClick={() => {
                  addProductToCart({ id: details.id });
                }}
                className="btn w-full mt-4"
              >
                Add To Card
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
