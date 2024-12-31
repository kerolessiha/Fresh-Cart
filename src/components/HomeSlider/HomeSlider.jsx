import imgage1 from "../../assets/imgs/slider-image-1.jpeg";
import imgage2 from "../../assets/imgs/slider-image-2.jpeg";
import imgage3 from "../../assets/imgs/slider-image-3.jpeg";
export default function HomeSlider() {
  return (
    <>
      <div className="grid grid-cols-12 mb-6">
        <div className="col-span-8">
          <swiper-container style={{ height: "100%" }} loop={true}>
            <swiper-slide style={{ height: "100%" }}>
              <img
                src={imgage1}
                alt=""
                className="w-full h-full object-cover"
              />
            </swiper-slide>
            <swiper-slide style={{ height: "100%" }}>
              <img
                src={imgage2}
                alt=""
                className="w-full h-full object-cover"
              />
            </swiper-slide>
            <swiper-slide style={{ height: "100%" }}>
              <img
                src={imgage3}
                alt=""
                className="w-full h-full object-cover"
              />
            </swiper-slide>
          </swiper-container>
        </div>
        <div className="col-span-4">
          <div className="h-1/2">
            {" "}
            <img src={imgage2} alt="" className="w-full h-full" />
          </div>
          <div className="h-1/2">
            {" "}
            <img src={imgage3} alt="" className="w-full h-full" />
          </div>
        </div>
      </div>
    </>
  );
}

// <img src={imgage1} alt="" className="w-full h-full" />;
