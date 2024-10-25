import SectionSlider from "@/components/shared/SectionSlider";
import ProductSliderSkeleton from "@/components/skeletons/ProductSliderSkeleton";
import { useGetAllProductsQuery } from "@/services/api/ProductsApi/ProductsApi";

const FeaturedProductSlider = () => {
  // Fetch products with a limit of 10
  const { data, error, isLoading } = useGetAllProductsQuery({
    limit: 10,
  },
  {
    // Individual query options
    refetchOnFocus: false,        // Prevent refetch when window regains focus
    refetchOnReconnect: false,    // Prevent refetch when network reconnects    
    refetchOnMountOrArgChange: false,  // Prevent refetch when the component mounts or args change
    keepUnusedDataFor: 30,
  }
);
  const products = data?.data || [];

  if (isLoading) {
    return <ProductSliderSkeleton />;
  }

  // Handle error state
  if (error) {
    return <div>Error fetching products!</div>;
  }

  return (
    <div>
      <SectionSlider title="Featured Products" products={products} />
    </div>
  );
};

export default FeaturedProductSlider;
