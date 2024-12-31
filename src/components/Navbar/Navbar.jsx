import { Link, NavLink } from "react-router-dom";
import freshCartLogo from "../../assets/imgs/freshcart-logo.svg";
import { useContext, useEffect } from "react";
import { UserContext } from "../../Context/User.context";
import { CartContext } from "../../Context/Cart.context";
export default function Navbar() {
  const { token, logOut } = useContext(UserContext);
  const { cartInfo, getCartProducts } = useContext(CartContext);
  useEffect(() => {
    getCartProducts();
  }, []);
  return (
    <>
      <nav className="bg-slate-100 py-3 shadow fixed top-0 left-0 right-0 z-50">
        <div className="container flex items-center gap-12">
          <Link href="/">
            <img src={freshCartLogo} alt="freshCartLogo" />
          </Link>
          {token && (
            <>
              <ul className="flex gap-5 items-center">
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 hover:before:w-full before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 ${
                        isActive ? "before:!w-full font-semibold " : ""
                      }`;
                    }}
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 hover:before:w-full before:transition-[width] before:duration-300  before:left-0 before:-bottom-1 ${
                        isActive ? "before:!w-full font-semibold " : ""
                      }`;
                    }}
                    to="/Products"
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 hover:before:w-full before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 ${
                        isActive ? "before:!w-full font-semibold " : ""
                      }`;
                    }}
                    to="/categories"
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 hover:before:w-full before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 ${
                        isActive ? "before:!w-full font-semibold " : ""
                      }`;
                    }}
                    to="/brands"
                  >
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 hover:before:w-full before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 ${
                        isActive ? "before:!w-full font-semibold " : ""
                      }`;
                    }}
                    to="/allorders"
                  >
                    Orders
                  </NavLink>
                </li>
              </ul>
              <Link to={"/cart"} className=" relative ml-auto cursor-pointer">
                <i className="fa-solid fa-cart-shopping text-lg"></i>
                <div className="cart-counter flex justify-center items-center absolute right-0 top-0 h-5 w-5 translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-800 text-white">
                  {cartInfo === null ? (
                    <i className="fa-solid fa-spinner text-sm fa-spin"></i>
                  ) : (
                    <span className="text-sm font-semibold">
                      {cartInfo.numOfCartItems}
                    </span>
                  )}
                </div>
              </Link>
            </>
          )}
          <ul className={`flex gap-5 items-center ${!token && "ms-auto"}`}>
            <li>
              <a href="https://instagram.com" target="_blank"></a>
              <li>
                <i className="fa-brands fa-instagram cursor-pointer"></i>
              </li>
            </li>
            <li>
              <a href="https://facebook.com" target="_blank"></a>
              <li>
                <i className="fa-brands fa-facebook cursor-pointer"></i>
              </li>
            </li>
            <li>
              <a href="https://tiktok.com" target="_blank"></a>
              <li>
                <i className="fa-brands fa-tiktok cursor-pointer"></i>
              </li>
            </li>
            <li>
              <a href="https://twitter.com" target="_blank"></a>
              <li>
                <i className="fa-brands fa-twitter cursor-pointer"></i>
              </li>
            </li>
            <li>
              <a href="https://linkedin.com" target="_blank"></a>
              <li>
                <i className="fa-brands fa-linkedin cursor-pointer"></i>
              </li>
            </li>
            <li>
              <a href="https://youtube.com" target="_blank "></a>
              <li>
                <i className="fa-brands fa-youtube cursor-pointer"></i>
              </li>
            </li>
          </ul>
          <ul className="flex gap-5 items-center">
            {!token && (
              <>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 hover:before:w-full before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 ${
                        isActive ? "before:!w-full font-semibold " : ""
                      }`;
                    }}
                    to="/signup"
                  >
                    Sing up
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 hover:before:w-full before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 ${
                        isActive ? "before:!w-full font-semibold " : ""
                      }`;
                    }}
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>
              </>
            )}
            {token && (
              <Link onClick={logOut}>
                <a href="/login">
                  <i className="fa-solid fa-right-from-bracket text-lg cursor-pointer"></i>
                </a>
              </Link>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
