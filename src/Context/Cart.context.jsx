import axios from "axios";
import { createContext, useContext, useState } from "react";
import { UserContext } from "./User.context";
import toast from "react-hot-toast";

export const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const { token } = useContext(UserContext);
  const [cartInfo, setCartInfo] = useState(null);
  // add
  async function AddProductToCart({ productId }) {
    let toastId = toast.loading("Adding product....");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "POST",
        headers: {
          token: token,
        },
        data: { productId },
      };
      let { data } = await axios.request(options);
      if (data.status === "success") {
        toast.success(data.message);
        getCartProducts();
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }
  // get
  async function getCartProducts() {
    // let toastId = toast.loading("Adding product....");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "GET",
        headers: {
          token: token,
        },
      };
      let { data } = await axios.request(options);

      console.log(data);

      setCartInfo(data);
    } catch (error) {
      console.log(error);
    }
    // finally {
    //   toast.dismiss(toastId);
    // }
  }
  // remove
  async function removeProductFromCart({ productId }) {
    let toastId = toast.loading("Deleting product .......");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: "DELETE",
        headers: { token },
      };
      let { data } = await axios.request(options);
      if (data.status === "success") {
        setCartInfo(data);
        toast.success("Product has been deleted");
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }
  async function clearCart() {
    let toastId = toast.loading("Clearing Cart .......");

    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "DELETE",
        headers: { token },
      };
      let { data } = await axios.request(options);
      if (data.message === "success") {
        setCartInfo({ numOfCartItems: 0 });
        toast.success("Cart has been cleared");
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }
  // update
  async function updateProductCount({ productId, count }) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: "PUT",
        headers: {
          token,
        },
        data: { count },
      };
      let { data } = await axios.request(options);
      if (data.status === "success") {
        setCartInfo(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <CartContext.Provider
      value={{
        AddProductToCart,
        getCartProducts,
        cartInfo,
        removeProductFromCart,
        clearCart,
        updateProductCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
