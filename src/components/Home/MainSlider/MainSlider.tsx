import Slider from "react-slick";


const MainSlider: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <div className="slider-container">
        <Slider {...settings}>
         
        </Slider>
      </div>
    </>
  );
};

export default MainSlider;
