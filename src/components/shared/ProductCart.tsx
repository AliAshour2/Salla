import { Link } from "react-router-dom";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { TproductCartProps } from "@/types";
import StarRating from "./StarRaring";
import { memo } from "react";

// Destructure product inside props
interface ProductCartProps {
  product: TproductCartProps;
  handleAddToWishlist: () => void;
  handleAddToCart?: () => void;
  isInWishlist: boolean;
}

const ProductCart = memo(({
  product,
  handleAddToWishlist,
  handleAddToCart,
  isInWishlist
}: ProductCartProps) => {
  return (
    <div className="relative rounded border p-3 group hover:border-green-500 hover:shadow-sm  duration-300 ease-in-out transition-all">
      <div className="text-center">
        <Link to={`/details/${product._id}`}>
          <img
            src={product.imageCover}
            alt={product.title}
            className="rounded h-full w-full object-cover duration-300 ease-in-out hover:scale-105 hover:mb-2 transition-all"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = "/path/to/placeholder/image.jpg"; // Placeholder image
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
                  onClick={handleAddToWishlist}
                  className={` ${isInWishlist ? "text-red-500" : "text-gray-500"} bg-white  px-2 py-1 rounded-lg  hover:text-white hover:bg-green-500`}
                  aria-label="Add to wishlist"
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

      {/* Product Title with Tooltip */}
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
              <span className=" my-1 mt-2">
                <Link
                  to={`/details/${product._id}`}
                  className="text-gray-900 hover:text-green-500 "
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

      {/* Ratings Section */}
      <div className="flex items-center text-yellow-500">
        <small>
          <StarRating rating={product.ratingsAverage} />
        </small>
        <span className="text-gray-500 text-sm px-2">
          {product.ratingsAverage} / 5 ({product.ratingsQuantity})
        </span>
      </div>

      {/* Price and Add to Cart Button */}
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

export default ProductCart;
