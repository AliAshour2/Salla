import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { TproductCartProps } from "@/types";
import StarRating from "./StarRaring";
import { memo, useCallback, useState } from "react";
import { toast } from "sonner";
import {
  useAddProductToWishListMutation,
  useRemoveProductFromWishListMutation,
} from "@/services/api/WishlistApi/WishlistApi";

interface ProductCartProps {
  product: TproductCartProps;
  initialIsInWishlist?: boolean;
  handleAddToCart?: () => void;
}

const ProductCart = memo(({
  product,
  initialIsInWishlist = false,
  handleAddToCart,
}: ProductCartProps) => {
  const [isInWishlist, setIsInWishlist] = useState(initialIsInWishlist);
  const [isLoading, setIsLoading] = useState(false);

  const [addToWishList] = useAddProductToWishListMutation();
  const [removeFromWishList] = useRemoveProductFromWishListMutation();

  const handleWishlistToggle = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);
    const toastId = `wishlist-${product._id}`;

    try {
      if (isInWishlist) {
        toast.loading(`Removing ${product.title} from wishlist...`, { id: toastId });
        await removeFromWishList(product).unwrap();
        toast.success(`${product.title} removed from wishlist`, { id: toastId });
      } else {
        toast.loading(`Adding ${product.title} to wishlist...`, { id: toastId });
        await addToWishList(product).unwrap();
        toast.success(`${product.title} added to wishlist`, { id: toastId });
      }
      
      setIsInWishlist(!isInWishlist);
    } catch (error) {
      console.error("Wishlist operation failed:", error);
      toast.error("Failed to update wishlist", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  }, [product, isInWishlist, isLoading, addToWishList, removeFromWishList]);

  return (
    <div className="relative rounded border p-3 group hover:border-green-500 hover:shadow-sm duration-300 ease-in-out transition-all">
      {isLoading && (
        <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center rounded">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
        </div>
      )}

      <div className="text-center">
        <Link to={`/details/${product._id}`}>
          <img
            src={product.imageCover}
            alt={product.title}
            className="rounded h-full w-full object-cover duration-300 ease-in-out hover:scale-105 hover:mb-2 transition-all"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = "/path/to/placeholder/image.jpg";
            }}
          />
        </Link>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Link
                  to={`/details/${product._id}`}
                  className="px-2 py-1 rounded-lg bg-white text-gray-500 hover:text-white hover:bg-green-500"
                  aria-label="Show Product"
                >
                  <i className="fa-regular fa-eye"></i>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Show Product</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <button
                  onClick={handleWishlistToggle}
                  disabled={isLoading}
                  className={`${
                    isInWishlist ? "text-red-500" : "text-gray-500"
                  } bg-white px-2 py-1 rounded-lg hover:text-white hover:bg-green-500`}
                  aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <i className="fa-solid fa-heart"></i>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isInWishlist ? "Remove from wishlist" : "Add to wishlist"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <Link
        to={`details/${product._id}`}
        className="text-sm text-gray-600 hover:text-green-500 block"
      >
        {product.category?.name}
      </Link>

      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger>
            <h5 className="text-md font-bold text-gray-800 text-start">
              <span className="mr-2 text-gray-700 block">
                {product.brand.name}
              </span>
              <span className="my-1 mt-2">
                <Link
                  to={`/details/${product._id}`}
                  className="text-gray-900 hover:text-green-500"
                >
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </Link>
              </span>
            </h5>
          </TooltipTrigger>
          <TooltipContent>
            <p>{product.title}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="flex items-center text-yellow-500">
        <small>
          <StarRating rating={product.ratingsAverage} />
        </small>
        <span className="text-gray-500 text-sm px-2">
          {product.ratingsAverage} / 5 ({product.ratingsQuantity})
        </span>
      </div>

      <div className="flex items-center justify-between mt-3">
        <div className="text-lg font-semibold text-gray-900">
          {product.price.toLocaleString()} EGY
        </div>
        <button
          className="rounded-full bg-green-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-600"
          aria-label="Add to cart"
          onClick={handleAddToCart}
        >
          Add+
        </button>
      </div>
    </div>
  );
});

ProductCart.displayName = "ProductCart";

export default ProductCart;