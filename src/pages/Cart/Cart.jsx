import { useContext, useEffect } from "react";
import { CartContext } from "../../Context/Cart.context";
import Loading from "../../components/Loading/Loading";
import Cartitem from "../../components/Cartitem/Cartitem";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Cart() {
  let { getCartProducts, cartInfo, clearCart } = useContext(CartContext);
  useEffect(() => {
    getCartProducts();
  }, []);
  return (
    <>
      <Helmet>
        <title>Cart </title>
      </Helmet>

      {cartInfo === null ? (
        <Loading />
      ) : (
        <section>
          <div className="flex items-center gap-8 mb-8">
            <i className="fa-brands fa-opencart text-3xl"></i>
            <h2 className="text-lg font-semibold pl-4 text-primary-950 relative before:absolute  before:w-0.5 before:h-3/4 before:bg-black before:-left-1 before:top-1/2 before:-translate-y-1/2">
              Your Shopping Cart
            </h2>
          </div>
          {cartInfo.numOfCartItems === 0 ? (
            <div className="bg-red-400 mt-6 rounded-md p-5 text-white flex justify-center items-center flex-col gap-3 shadow">
              <h2 className="font-semibold text-xl">
                OoPS!Your Cart is empty.Start Shopping now by clicking the
                button below and find something you love{" "}
              </h2>
              <Link
                to={"/"}
                className="bg-primary-700 btn text-white font-semibold hover:bg-primary-800 "
              >
                <i className="fa-solid fa-trash mr-2"></i>Back To Home
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {cartInfo.data.products.map((product) => (
                  <Cartitem key={product._id} productInfo={product} />
                ))}
              </div>
              <div className="mt-4 flex justify-between items-center">
                <p className="font-semibold text-lg">
                  <i className="fa-solid fa-sack-dollar text-primary-900 text-xl mr-2"></i>{" "}
                  Your total price is :{" "}
                  <span className="text-primary-900 font-bold">
                    {cartInfo.data.totalCartPrice}
                  </span>
                </p>
                <button
                  onClick={clearCart}
                  className="bg-red-700 p-2 px-4 rounded-md text-white font-semibold hover:bg-red-800"
                >
                  <i className="fa-solid fa-trash mr-2"></i>Clear Cart
                </button>
              </div>
              <Link
                to="/checkout"
                className="btn w-full text-center block mt-6 bg-primary-800 text-white font-semibold hover:bg-primary-900"
              >
                Next Step
              </Link>
            </>
          )}
        </section>
      )}
    </>
  );
}
