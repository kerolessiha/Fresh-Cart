import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Loading from "./../../components/Loading/Loading";
import { useParams } from "react-router-dom";
import { CartContext } from "./../../Context/Cart.context";
import ReactImageGallery from "react-image-gallery";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ProductCard from "./../../components/ProductCard/ProductCard";
import { Helmet } from "react-helmet";

export default function ProductDetails() {
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [productDetailes, setProductDetailes] = useState(null);
  let { AddProductToCart } = useContext(CartContext);
  const { id } = useParams();
  async function getProductDetails() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
      method: "GET",
    };
    let { data } = await axios.request(options);
    console.log(data);
    setProductDetailes(data.data);
  }
  async function getRelatedProducts() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${productDetailes.category._id}`,
      method: "GET",
    };
    let { data } = await axios.request(options);
    setRelatedProducts(data.data);
  }
  useEffect(() => {
    getProductDetails();
  }, [id]);

  useEffect(() => {
    if (productDetailes === null) return;
    getRelatedProducts();
  }, [productDetailes]);
  return (
    <>
      <Helmet>
        <title>Product Details </title>
      </Helmet>

      {productDetailes && relatedProducts ? (
        <>
          <Helmet>
            <title>{productDetailes.title} </title>
          </Helmet>
          <section className="grid grid-cols-12 gap-8">
            <div className="col-span-3">
              <ReactImageGallery
                showPlayButton={false}
                showFullscreenButton={false}
                showNav={false}
                items={productDetailes.images.map((image) => {
                  return { original: image, thumbnail: image };
                })}
              />
            </div>
            <div className="col-span-9 space-y-4">
              <div>
                <h2 className="font-semibold text-xl">
                  {productDetailes.title} product name{" "}
                </h2>
                <h3 className="text-primary-800 font-semibold">
                  {productDetailes.category.name}{" "}
                </h3>
              </div>
              <p className="text-gray-500">{productDetailes.description}</p>
              <div className="flex justify-between items-center">
                <span>{productDetailes.price} EGP</span>
                <div>
                  <i className="fa-solid fa-star text-yellow-500 mr-1"></i>
                  <span>{productDetailes.ratingsAverage} </span>
                </div>
              </div>
              <button
                onClick={() => AddProductToCart({ productId: id })}
                className="btn font-semibold bg-primary-800 hover:bg-primary-900 text-white w-full"
              >
                Add To Cart
              </button>
            </div>
          </section>
          <section>
            <h2 className="text-2xl text-gray-800 my-10">Related Products</h2>
            <Swiper slidesPerView={6} spaceBetween={15}>
              {relatedProducts.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard productInfo={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
