import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TproductCartProps } from "@/types";
import ProductCart from "./ProductCart";
import {
  useAddProductToWishListMutation,
  useRemoveProductFromWishListMutation,
} from "@/services/api/WishlistApi/WishlistApi";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

interface SectionSliderProps {
  title: string;
  products: TproductCartProps[] | undefined;
}

const SectionSlider = ({ title, products }: SectionSliderProps) => {
  const productList = useMemo(() => products ?? [], [products]);
  const [addProductToWishList] = useAddProductToWishListMutation();
  const [removeProductFromWishList] = useRemoveProductFromWishListMutation();
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);

   // 4. Optimize wishlist toggle handler with useCallback
   const handleWishlistToggle = useCallback(async (product: TproductCartProps) => {
    const isInWishlist = wishlistItems.includes(product._id);
    const toastId = toast.loading(
      `${isInWishlist ? 'Removing' : 'Adding'} ${product.title} ${isInWishlist ? 'from' : 'to'} wishlist`
    );

    try {
      if (isInWishlist) {
        await removeProductFromWishList(product).unwrap();
        setWishlistItems(prev => prev.filter(id => id !== product._id));
      } else {
        await addProductToWishList(product).unwrap();
        setWishlistItems(prev => [...prev, product._id]);
      }
      
      toast.success(
        `${product.title} ${isInWishlist ? 'removed from' : 'added to'} wishlist`,
        { id: toastId }
      );
    } catch (error) {
      console.error("Failed to update wishlist: ", error);
      toast.error("Failed to update wishlist", { id: toastId });
    }
  }, [wishlistItems, addProductToWishList, removeProductFromWishList]);

  // 5. Memoize the check for wishlist items
  const isProductInWishlist = useCallback((productId: string) => 
    wishlistItems.includes(productId),
    [wishlistItems]
  );
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-700 mb-4 max-sm:pl-3">
        {title}
      </h2>
      <Carousel className="w-full max-sm:px-3">
        <CarouselContent className="-ml-1">
          {productList.length > 0 ? (
            productList.map((product) => (
              <CarouselItem
                key={product._id}
                className="pl-1 md:basis-1/2 lg:basis-1/5"
              >
                <div className="p-1">
                  <ProductCart
                    handleAddToWishlist={() => handleWishlistToggle(product)}
                    isInWishlist={isProductInWishlist(product._id)}
                    product={product}
                  />
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
