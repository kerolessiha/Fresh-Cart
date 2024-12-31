import { useContext } from "react";

import { CartContext } from "../../Context/Cart.context";
import { Link } from "react-router-dom";

export default function Cartitem({ productInfo }) {
  const { count, price, product } = productInfo;
  const { title, imageCover, category, id } = product;
  let { removeProductFromCart, updateProductCount } = useContext(CartContext);
  return (
    <>
      <div className="flex gap-2">
        <div className="card-item bg-primary-700  py-4 px-6 rounded-lg flex flex-grow justify-between items-center ">
          <img
            src={imageCover}
            alt={title}
            className="size-24  object-cover rounded-full border-4"
          />
          <h3 className="font-semibold text-lg text-white">
            <Link to={`/product/${id}`}>{title}</Link>
          </h3>
          <h4 className="font-semibold text-lg text-white">{category.name}</h4>
          <div className="count flex gap-5 items-center">
            <span className=" text-white">{count}</span>
            <div className="icons space-y-3">
              <div
                onClick={() => {
                  updateProductCount({ productId: id, count: count + 1 });
                }}
                className="plus  w-6 h-6 rounded-full bg-gray-900 text-white flex justify-center items-center cursor-pointer"
              >
                <i className="fa-solid fa-plus "></i>
              </div>
              <div
                onClick={() => {
                  updateProductCount({ productId: id, count: count - 1 });
                }}
                className="minus  w-6 h-6 rounded-full bg-gray-900 text-white flex justify-center items-center cursor-pointer"
              >
                <i className="fa-solid fa-minus "></i>
              </div>
            </div>
          </div>
          <span className="text-white">{price} L.E</span>
        </div>
        <button
          onClick={() => {
            removeProductFromCart({ productId: id });
          }}
          className="text-white bg-primary-700 hover:bg-primary-900 transition-colors duration-300 p-3 rounded-md"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </>
  );
}
