import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import {
  useAddProductToWishListMutation,
  useRemoveProductFromWishListMutation,
} from '@/services/api/WishlistApi/WishlistApi';
import { TproductCartProps } from '@/types';

export const useWishlist = (product: TproductCartProps, initialIsInWishlist: boolean) => {
  const [isInWishlist, setIsInWishlist] = useState(initialIsInWishlist);
  const [isLoading, setIsLoading] = useState(false);
  const [addToWishList] = useAddProductToWishListMutation();
  const [removeFromWishList] = useRemoveProductFromWishListMutation();

  const handleWishlistToggle = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);
    const toastId = `wishlist-${product._id}`;
    const newWishlistState = !isInWishlist;

    // Optimistically update the UI
    setIsInWishlist(newWishlistState);

    try {
      if (newWishlistState) {
        toast.loading(`Adding ${product.title} to wishlist...`, { id: toastId });
        await addToWishList(product).unwrap();
        toast.success(`${product.title} added to wishlist`, { id: toastId });
      } else {
        toast.loading(`Removing ${product.title} from wishlist...`, { id: toastId });
        await removeFromWishList(product).unwrap();
        toast.success(`${product.title} removed from wishlist`, { id: toastId });
      }
    } catch (error) {
      console.error("Wishlist operation failed:", error);
      toast.error("Failed to update wishlist", { id: toastId });

      // Revert the optimistic update
      setIsInWishlist(!newWishlistState);
    } finally {
      setIsLoading(false);
    }
  }, [product, isInWishlist, isLoading, addToWishList, removeFromWishList]);

  return { isInWishlist, isLoading, handleWishlistToggle };
};