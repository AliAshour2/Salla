import BrandsMarqueeComponent from "@/components/Home/BrandsMarquee/BrandsMarqueeComponent";
import MainSlider from "@/components/Home/MainSlider/MainSlider";
import FeaturedProductSlider from "@/components/Home/FeaturedProductSlider/FeaturedProductSlider";

const Home = () => {
  return (
    <>
      <div className="container mx-auto">
        <MainSlider />
        <BrandsMarqueeComponent />
        <FeaturedProductSlider/>     
      </div>
    </>
  );
};

export default Home;
