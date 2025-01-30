import ProductCart from "../../Components/ProductCart/ProductCart";
import Loading from "../../Components/Loading/Loading";
import CategorySlider from "../../Components/CategorySlider/CategorySlider";
import HomeSlider from "../../Components/HomeSlider/HomeSlider";
import useProducts from "../../Components/Hooks/useProducts";
import { Helmet } from "react-helmet";

export default function Home() {
  const { data, isLoading } = useProducts();
  if (isLoading) {
    <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Welcome to home page" />
      </Helmet>

      <HomeSlider />
      <CategorySlider />
      <div className="grid grid-cols-12 gap-4 mt-5">
        {data?.data?.data.map((product) => (
          <ProductCart key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
