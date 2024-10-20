import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TproductCartProps } from "@/types";
import ProductCart from "./ProductCart";

interface SectionSliderProps {
  title: string;
  products: TproductCartProps[] | undefined;
}

const SectionSlider = ({ title, products }: SectionSliderProps) => {
  const productList = products ?? [];

  return (
    <div >
      <h2 className="text-2xl font-bold text-gray-700 mb-4 max-sm:pl-3">{title}</h2>
      <Carousel className="w-full max-sm:px-3">
        <CarouselContent className="-ml-1">
          {productList.length > 0 ? (
            productList.map((product) => (
              <CarouselItem
                key={product._id}
                className="pl-1 md:basis-1/2 lg:basis-1/5"
              >
                <div className="p-1">
                  <ProductCart product={product} />
                </div>
              </CarouselItem>
            ))
          ) : (
            <div>No products available </div> // Handle empty state
          )}
        </CarouselContent>
        <CarouselPrevious className="max-sm:left-6" />
        <CarouselNext className="max-sm:right-6" />
      </Carousel>
    </div>
  );
};

export default SectionSlider;
