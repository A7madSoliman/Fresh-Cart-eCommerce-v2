import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import { Helmet } from "react-helmet";

export default function Brands() {
  const [data, setData] = useState(null);
  const [productLimitation, setProductLimitation] = useState(30);

  async function getAllBrands() {
    try {
      const options = {
        method: "GET",
        url: `https://ecommerce.routemisr.com/api/v1/brands?limit=${productLimitation}`,
      };

      let { data } = await axios.request(options);
      setData(data);
    } catch (error) {}
  }

  useEffect(() => {
    getAllBrands();
  }, [productLimitation]);
  return (
    <>
      <Helmet>
        <title>Brands</title>
        <meta name="description" content="Welcome to Brands page" />
      </Helmet>

      {data ? (
        <>
          <section className="wrapper grid grid-cols-12 gap-2 px-2 pb-16 mt-4">
            {data.data.map((brand) => (
              <Link
                data-aos="zoom-in-up"
                data-aos-duration="500"
                key={brand._id}
                className="col-span-4 md:col-span-3 lg:md:col-span-2  flex items-center justify-center "
              >
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="size-36 bg-white rounded-full shadow-md p-2 cursor-pointer object-contain hover:scale-[1.2] hover:-translate-y-8 duration-500"
                />
              </Link>
            ))}
          </section>

          {productLimitation === 30 ? (
            <div className="text-center max-xs:pb-4">
              <button
                type="button"
                onClick={() => {
                  setProductLimitation(productLimitation + 20);
                }}
                className="btn text-sm"
              >
                Show More
              </button>
            </div>
          ) : (
            ""
          )}

          {productLimitation === 50 ? (
            <div className="text-center max-xs:pb-4">
              <button
                type="button"
                onClick={() => {
                  setProductLimitation(productLimitation - 20);
                }}
                className="btn text-sm"
              >
                Show less
              </button>
            </div>
          ) : (
            ""
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
