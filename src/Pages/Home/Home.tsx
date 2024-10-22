import BrandsMarqueeComponent from "@/components/Home/BrandsMarquee/BrandsMarqueeComponent";
import MainSlider from "@/components/Home/MainSlider/MainSlider";
import FeaturedProductSlider from "@/components/Home/FeaturedProductSlider/FeaturedProductSlider";
import MenProductSlider from "@/components/Home/WomanSectionSlider/WomanSectionSlider";
import ElectronicProductSlider from "@/components/Home/ElectronicProductsSlider/ElectronicProductsSlider";

const Home = () => {
  return (
    <>
      <div className="container mx-auto  space-y-5">
        <MainSlider />
        <BrandsMarqueeComponent />
        <FeaturedProductSlider/>
        <MenProductSlider/> 
        <ElectronicProductSlider/>    
      </div>
    </>
  );
};

export default Home;
