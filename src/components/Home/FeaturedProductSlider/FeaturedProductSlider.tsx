import SectionSlider from "@/components/shared/SectionSlider";
import ProductSliderSkeleton from "@/components/skeletons/ProductSliderSkeleton";
import { useGetAllProductsQuery } from "@/services/api/ProductsApi/ProductsApi";

const FeaturedProductSlider = () => {
  // Fetch products with a limit of 10
  const { data, error, isLoading } = useGetAllProductsQuery({
    limit: 10,
  });
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
