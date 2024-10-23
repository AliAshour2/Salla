import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import ProductCardSkeleton from './ProductCartSkelton'

const ProductSliderSkeleton = () => {
  return (
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
  )
}

export default ProductSliderSkeleton