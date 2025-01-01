import { useCallback } from 'react';
import { toast } from 'sonner';
import { useAddProductToCartMutation } from '@/services/api/cart/CartApi';
import { TproductCartProps } from '@/types';

export const useCart = (product: TproductCartProps) => {
  const [addToCart] = useAddProductToCartMutation();

  const handleAddToCart = useCallback(async () => {
    const toastId = `cart-${product._id}`;
    try {
      toast.loading("Adding Product To Cart", { id: toastId });
      await addToCart(product).unwrap();
      toast.success(`${product.title} added to cart`, { id: toastId });
    } catch (error) {
      console.error("Add to cart operation failed:", error);
      toast.error("Failed to add product to cart", { id: toastId });
    }
  }, [product, addToCart]);

  return { handleAddToCart };
};