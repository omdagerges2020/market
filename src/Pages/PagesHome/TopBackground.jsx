import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";



const TopBackground = () => {

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    className: " w-[100%]",
  };

  return (
    <div className="mt-5 container mx-auto">

      <Slider {...settings}>
        <div>
          <img
            src="https://goomarket.vercel.app/assets/slider_img_2-ad43ef2a.jpg"
            alt=""
            style={{ width: "100%", height: "350px" }}
          />
        </div>
        <div>
          <img
            src="https://goomarket.vercel.app/assets/slider_img_1-aa711fe6.jpg"
            alt=""
            style={{ width: "100%", height: "350px" }}
          />
        </div>
      </Slider>

    </div>
  );
};

export default TopBackground;
