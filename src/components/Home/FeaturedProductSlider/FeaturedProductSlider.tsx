import SectionSlider from "@/components/shared/SectionSlider";
import ProductCardSkeleton from "@/components/skeletons/ProductCartSkelton";
import { useGetAllProductsQuery } from "@/services/api/GetAllProductsApi/GetAllProductsApi";

const FeaturedProductSlider = () => {
  // Fetch products with a limit of 10
  const { data, error, isLoading } = useGetAllProductsQuery({
    limit: 10,
  });

  if (isLoading) {
    return (
      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  // Handle error state
  if (error) {
    return <div>Error fetching products!</div>;
  }

  
  const products = data?.data || []; 

  return (
    <div>
      <SectionSlider 
        title="Featured Products"
        products={products}
      />
    </div>
  );
};

export default FeaturedProductSlider;
