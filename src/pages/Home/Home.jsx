import axios from "axios";
import ProductCard from "./../../components/ProductCard/ProductCard";
import Loading from "../../components/Loading/Loading";
import HomeSlider from "../../components/HomeSlider/HomeSlider";
import CategorySlider from "../../components/CategorySlider/CategorySlider";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  async function getProducts() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    };
    return await axios.request(options);
  }

  let { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    refetchOnMount: false,
    gcTime: 10000,
  });
  if (isLoading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Home Page</title>
      </Helmet>

      <HomeSlider />
      <CategorySlider />

      <div className="grid grid-cols-12 gap-4">
        {data.data.data.map((product) => (
          <ProductCard productInfo={product} key={product._id} />
        ))}
      </div>
    </>
  );
}
