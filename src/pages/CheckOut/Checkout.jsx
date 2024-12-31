import { useFormik } from "formik";
import { useContext, useState } from "react";
import { CartContext } from "../../Context/Cart.context";
import { UserContext } from "../../Context/User.context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Checkout() {
  let navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState(null);
  const { cartInfo } = useContext(CartContext);
  const { token } = useContext(UserContext);

  async function handleCashOeder(values) {
    let toastId = toast.loading("making an order...");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
        method: "POST",
        headers: {
          token,
        },
        data: values,
      };
      const { data } = await axios.request(options);
      if (data.status === "success") {
        toast.success("order has been confirmed");
        setTimeout(() => {
          navigate("/allordrs");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }
  async function handleOnlineOrder(values) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=${location.origin}`,
        method: "POST",
        headers: {
          token,
        },
        data: values,
      };
      let { data } = await axios.request(options);
      if (data.status === "success") {
        toast.loading("Redirecting You To Stribe ");
        setTimeout(() => {
          location.href = data.session.url;
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    onSubmit: (values) => {
      if (paymentMethod === "cash") handleCashOeder();
      else handleOnlineOrder();
    },
  });
  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-700 mb-4">
        Shipping Address
      </h1>
      <form className="space-y-4" onSubmit={formik.handleSubmit}>
        <div className="city">
          <input
            type="text"
            placeholder="city"
            className="form-control w-full"
            value={formik.values.shippingAddress.city}
            onChange={formik.handleChange}
            name="shippingAddress.city"
          />
        </div>
        <div className="phone">
          <input
            type="tel"
            placeholder="Phone"
            className="form-control w-full"
            value={formik.values.shippingAddress.phone}
            onChange={formik.handleChange}
            name="shippingAddress.phone"
          />
        </div>
        <div className="details">
          <textarea
            placeholder="Details"
            className="form-control w-full"
            value={formik.values.shippingAddress.details}
            onChange={formik.handleChange}
            name="shippingAddress.details"
          ></textarea>
        </div>
        <button
          onClick={() => {
            setPaymentMethod("cash");
          }}
          className="btn bg-blue-600 hover:bg-blue-800 text-white"
        >
          Cash Order
        </button>
        <button
          onClick={() => {
            setPaymentMethod("online");
          }}
          className="btn bg-primary-600 hover:bg-primary-800 text-white ml-2"
        >
          Online Payment
        </button>
      </form>
    </>
  );
}
