import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fontsource/encode-sans-expanded";
import "@fontsource-variable/cairo";
import "./index.css";
import App from "./App.jsx";
import "react-image-gallery/styles/css/image-gallery.css";
// import function to register Swiper Core custom elements
import { register } from "swiper/element";
// register Swiper custom elements
register();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
