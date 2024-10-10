import Marquee from "react-fast-marquee";
import MarqueeItem from "./MarqueeItem";
import MarqueeItemSkeleton from "@/components/skeletons/MarqueeItemSkeleton";
import { TBrand } from "@/types";
import { useBrandsQuery } from "@/hooks/useBrands";

const BrandsMarqueeComponent = () => {
  const { data, isLoading, isError } = useBrandsQuery();

  if (isLoading || isError) {
    return (
      <Marquee className="flex gap-x-6">
        {Array.from({ length: 20 }).map((_, index) => (
          <MarqueeItemSkeleton key={index} />
        ))}
      </Marquee>
    );
  }

  return (
    <Marquee className="flex gap-x-4 my-6 ">
      {data?.data.data.map((brand: TBrand) => (
        <MarqueeItem key={brand._id} name={brand.name} image={brand.image} />
      ))}
    </Marquee>
  );
};

export default BrandsMarqueeComponent;
