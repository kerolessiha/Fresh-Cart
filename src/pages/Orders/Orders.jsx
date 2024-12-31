import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/User.context";
import Loading from "../../components/Loading/Loading";
import { Helmet } from "react-helmet";

export default function Orders() {
  const [orders, setOrders] = useState(null);
  const { token } = useContext(UserContext);
  let { id } = jwtDecode(token);

  async function getUserOrders() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
        method: "GET",
      };
      let { data } = await axios.request(options);
      console.log(data);

      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUserOrders();
  }, []);
  return (
    <>
      <Helmet>
        <title>Orders </title>
      </Helmet>

      {orders ? (
        <section className="space-y-2">
          {orders.map((order) => {
            return (
              <div
                key={order.id}
                className="order border-2 border-gray-700 border-opacity-30 p-4 rounded-lg"
              >
                <header className="flex justify-between items-center">
                  <div>
                    <h2 className="text-gray-400">Order ID</h2>
                    <span className="font-bold text-lg">{order.id}</span>
                  </div>
                  <div>
                    {order.isDelivered ? (
                      <span className="bg-primary-600 text-white font-semibold rounded-full  px-3 py-1 font-cairo  ">
                        تم الاستلام
                      </span>
                    ) : (
                      <span className="bg-blue-600 text-white font-semibold rounded-full  px-3 py-1 font-cairo  ">
                        قيد التوصيل
                      </span>
                    )}
                    {order.isPaid ? (
                      <span className="bg-red-600 text-white font-semibold rounded-full  px-3 py-1 font-cairo mr-3">
                        غير مدفوع
                      </span>
                    ) : (
                      <span className="bg-primary-600 text-white font-semibold rounded-full  px-3 py-1 font-cairo mr-3">
                        مدفوع
                      </span>
                    )}
                  </div>
                </header>
                <div className="grid gap-4 mt-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                  {order.cartItems.map((product) => {
                    return (
                      <div
                        key={product._id}
                        className="productItem border-2 border-gray-600 p-3 rounded-lg border-opacity-30"
                      >
                        <img
                          src={product.product.imageCover}
                          alt=""
                          className="w-full"
                        />
                        <h3 className="tetx-lg font-semibold">
                          {product.product.title}
                        </h3>
                        <span>{product.price} L.E</span>
                      </div>
                    );
                  })}
                </div>
                <p className="text-lg mt-5 font-semibold">
                  Total Order Price Is :{" "}
                  <span className="text-primary-900">
                    {order.totalOrderPrice}
                  </span>{" "}
                  L.E
                </p>
              </div>
            );
          })}
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
}
