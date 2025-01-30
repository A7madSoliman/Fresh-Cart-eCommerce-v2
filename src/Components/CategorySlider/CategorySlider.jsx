import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import "swiper/css";
import "swiper/css/navigation";

export default function CategorySlider() {
  const [categories, setCategories] = useState(null);

  async function getCategories() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/categories",
        method: "GET",
      };
      const { data } = await axios.request(options);
      setCategories(data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      {categories ? (
        <section className="pb-5">
          <h2 className="font-semibold text-lg text-primary mb-5">
            Shop Popular Categories
          </h2>
          <swiper-container
            loop={true}
            autoPlay={true}
            slides-per-view={5}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            speed={200}
          >
            {categories.map((category) => (
              <swiper-slide key={category._id}>
                <div>
                  <img
                    src={category.image}
                    alt="Category Image"
                    className="w-full h-64 object-cover"
                  />
                  <h3 className="text-center font-semibold text-sm">
                    {category.name}
                  </h3>
                </div>
              </swiper-slide>
            ))}
          </swiper-container>
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
}
