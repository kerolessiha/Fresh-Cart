import axios from "axios";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function CategorySlider() {
  async function getCategories() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    };
    return await axios.request(options);
  }
  let { data, isLoading, isError, isFetched, isFetching } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    refetchOnMount: false,
    staletime: 60 * 60 * 1000,
  });
  if (isLoading) return <Loading />;
  return (
    <>
      <section className="py-8">
        <h2 className="font-semibold text-lg mb-3 ">Shop Popular Categories</h2>
        <swiper-container loop={true} slides-per-view={6}>
          {data.data.data.map((category) => (
            <swiper-slide key={category._id}>
              <Link to={`/category/${category._id}`}>
                {" "}
                <img
                  src={category.image}
                  alt=""
                  className="w-full h-72 object-cover"
                />
                <h3>{category.name}</h3>
              </Link>
            </swiper-slide>
          ))}
        </swiper-container>
      </section>
    </>
  );
}
