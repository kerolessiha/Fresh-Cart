import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Offline, Online } from "react-detect-offline";
import offlineImg from "../../assets/imgs/offline.svg";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Online>
        {" "}
        <div className="container min-h-[60vh] pb-10 pt-20 ">
          <Outlet></Outlet>
        </div>
      </Online>
      <Offline>
        <div className="flex items-center justify-center mt-28">
          <img src={offlineImg} className="w-48" alt="" />
          <h2 className="text-red-900 text-4xl font-semibold ml-4">
            YOU Are Offline Now{" "}
          </h2>
        </div>
      </Offline>
      <Footer />
    </>
  );
}
