import SectionSlider from "@/components/shared/SectionSlider";
import ProductCardSkeleton from "@/components/skeletons/ProductCartSkelton";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useGetAllProductsQuery } from "@/services/api/ProductsApi/ProductsApi";

const ElectronicProductSlider = () => {
  // Fetch products with a limit of 10
  const { data, error, isLoading } = useGetAllProductsQuery({
    limit: 10,
    categoryIn : ["6439d2d167d9aa4ca970649f"],
  });
  const products = data?.data || [];

 
  if(isLoading)
  {
    return(
      <Carousel className="w-full max-sm:px-3">
        <CarouselContent className="-ml-1">
              
        {Array.from({ length: 10 }).map((_, index) => ( // Adjust the number of skeletons as needed
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/5">
            <div className="flex space-x-2 p-1">
              <ProductCardSkeleton  />
            </div>
          </CarouselItem>
        ))}
            
        </CarouselContent>
        <CarouselPrevious className="max-sm:left-6" />
        <CarouselNext className="max-sm:right-6" />
      </Carousel>
    );
  }

  // Handle error state
  if (error) {
    return <div>Error fetching products!</div>;
  }

  return (
    <div>
      <SectionSlider title="Electronic Products" products={products} />
    </div>
  );
};

export default ElectronicProductSlider;
