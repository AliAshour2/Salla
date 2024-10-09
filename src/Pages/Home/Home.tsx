import BrandsMarqueeComponent from "@/components/Home/BrandsMarquee/BrandsMarqueeComponent";
import MainSlider from "@/components/Home/MainSlider/MainSlider";

const Home = () => {
  return (
    <>
      <div className="container mx-auto">
        <MainSlider />
        <BrandsMarqueeComponent/>
      </div>
    </>
  );
};

export default Home;
