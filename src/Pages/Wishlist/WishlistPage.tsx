import { useState } from "react";

import { TproductCartProps } from "@/types";
import {
  useGetWishListQuery,
  useRemoveProductFromWishListMutation,
} from "@/services/api/WishlistApi/WishlistApi";
import ProductCart from "@/components/shared/ProductCart";
import { toast } from "sonner";

const WishlistPage = () => {
  const {
    data: wishlistData,
    isLoading: isPageLoading,
    error,
  } = useGetWishListQuery({});
  const [removeFromWishlist] = useRemoveProductFromWishListMutation();
  const [loadingProducts, setLoadingProducts] = useState<string[]>([]); // Track loading products by ID

  const handleAddToWishlist = async (product: TproductCartProps) => {
    try {
      // Add product ID to loading state
      toast.loading(`Removing ${product.title} from wishlist...`, {
        id: product._id,
      });
      await removeFromWishlist(product).unwrap();
      toast.success(`${product.title} removed from wishlist`, {
        id: product._id,
      });
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Error removing from wishlist");
    } finally {
      // Remove product ID from loading state
      setLoadingProducts((prev) => prev.filter((id) => id !== product._id));
    }
  };

  const handleAddToCart = (product: TproductCartProps) => {
    console.log("Adding to cart:", product);
  };

  if (isPageLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <div className="text-red-500 text-center">
          <i className="fa-solid fa-triangle-exclamation text-3xl mb-2"></i>
          <p>Error loading wishlist. Please try again later.</p>
        </div>
      </div>
    );
  }

  if (!wishlistData?.data?.length) {
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col justify-center items-center min-h-[60vh]">
        <i className="fa-regular fa-heart text-4xl mb-4 text-gray-400"></i>
        <h2 className="text-2xl font-semibold text-gray-600 mb-2">
          Your wishlist is empty
        </h2>
        <p className="text-gray-500">Start adding items to your wishlist!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Wishlist</h1>
        <span className="text-gray-600">
          {wishlistData.data.length}{" "}
          {wishlistData.data.length === 1 ? "item" : "items"}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {wishlistData.data.map((product: TproductCartProps) => (
          <div key={product._id} className="relative">
            {/* Loading Overlay */}
            {loadingProducts.includes(product._id) && (
              <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center rounded">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
              </div>
            )}

            <ProductCart
              product={product}
              handleAddToWishlist={() => handleAddToWishlist(product)}
              handleAddToCart={() => handleAddToCart(product)}
              isInWishlist={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
