import axios from "axios";
import { useQuery } from "react-query";

export default function useProducts() {
  async function getProducts() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    };
    return axios.request(options);
  }

  let response = useQuery({
    queryKey: ["Products"],
    queryFn: getProducts,
  });

  return response;
}
