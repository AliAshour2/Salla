
import Slider from "react-slick";
import React from "react";
import { useTranslation } from "react-i18next";
import MainSliderItem from "./MainSliderItem";
import { img1, img2 } from "../../../constants";
const images = [img1, img2];



const MainSlider: React.FC = () => {
  const { t } = useTranslation();
  const settings = {
    dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 1500,
  appendDots: (dots : "")  => (
    <div style={{ bottom: "5px" }}>
      <ul style={{ margin: "0px" }}>{dots}</ul>
    </div>
  ),
  }; 

  const sliderItems: Array<{
    id: number;
    badgeText: string;
    title: string;
    description: string;
    link: string;
    ActionButtonText: string;
  }> = t("mainSlider.items", { returnObjects: true });
  return (
    <>
      <div className="slider-container">
        <Slider {...settings}>
        {sliderItems.map((item, index) => (
        <MainSliderItem
          key={item.id}
          image={images[index]}
          badgeText={item.badgeText}
          title={item.title}
          description={item.description}
          link={item.link}
          ActionButtonText={item.ActionButtonText}
        />
      ))}
        </Slider>
      </div>
    </>
  );
};

export default MainSlider;
