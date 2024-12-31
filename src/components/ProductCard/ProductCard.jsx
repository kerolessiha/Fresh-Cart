import { useContext } from "react";
import { CartContext } from "../../Context/Cart.context";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function ProductCard({ productInfo }) {
  const { images, title, price, category, ratingsAverage, id } = productInfo;
  let { AddProductToCart } = useContext(CartContext);
  return (
    <>
      <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 shadow-lg rounded-md overflow-hidden">
        <div className="relative">
          <img src={images[0]} alt="" className="w-full" />
          <div className="layer opacity-0 hover:opacity-100 transition-opacity duration-300 flex gap-2 items-center justify-center absolute w-full h-full top-0 left-0 bg-black bg-opacity-15">
            <div className="icon hover:scale-110 hover:rotate-6 transition-transform duration-300 cursor-pointer  w-10 h-10 rounded-full bg-primary-900 text-white flex items-center justify-center">
              <i className="fa-solid fa-heart "></i>
            </div>
            <div
              onClick={() => {
                AddProductToCart({ productId: id });
              }}
              className="icon hover:scale-110 hover:rotate-6 transition-transform duration-300 cursor-pointer  w-10 h-10 rounded-full bg-primary-900 text-white flex items-center justify-center"
            >
              <i className="fa-solid fa-cart-shopping"></i>
            </div>
            <Link
              to={`/product/${id}`}
              className="icon hover:scale-110 hover:rotate-6 transition-transform duration-300  cursor-pointer w-10 h-10 rounded-full bg-primary-900 text-white flex items-center justify-center"
            >
              <i className="fa-solid fa-eye"></i>
            </Link>
          </div>
        </div>
        <div className="p-3">
          <h3 className="text-primary-900">{category.name}</h3>
          <h2 className="tetx-lg font-semibold line-clamp-2">{title}</h2>
          <div className="flex items-center justify-between mt-4">
            <span>{price} L.E</span>
            <div className="flex items-center  gap-1">
              <i className="fa-solid fa-star text-yellow-500"></i>
              <span>{ratingsAverage}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
