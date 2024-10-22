import { Link } from "react-router-dom";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { TproductCartProps } from "@/types";
import StarRating from "./StarRaring";

// Destructure product inside props
interface ProductCartProps {
  product: TproductCartProps;
}

const ProductCart = ({ product }: ProductCartProps) => {
  return (
    <div className="relative rounded border p-3 group hover:border-green-500 hover:shadow-sm">
      <div className="text-center">
        <Link to={`details/${product._id}`}>
          <img
            src={product.imageCover}
            alt={product.title}
            className="w-full h-auto rounded"
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
                <button
                  className="px-2 py-1 rounded-lg bg-white text-gray-500 hover:text-white hover:bg-green-500"
                  aria-label="Show Product"
                >
                  <i className="fa-regular fa-eye"></i>
                </button>
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
                  className="bg-white px-2 py-1 rounded-lg text-gray-500 hover:text-white hover:bg-green-500"
                  aria-label="Add to wishlist"
                >
                  <i className="fa-solid fa-heart"></i>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to wishlist</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Product Title with Tooltip */}
      <Link
        to={`details/${product._id}`}
        className="text-black text-decoration-none block"
      >
        {product.category?.name}
      </Link>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger>
            <h5 className="text-md font-bold text-gray-800 text-start">
              <span className="mr-2">{product.brand.name}</span>
              <span className=" my-1 mt-2">
                <Link to={`details/${product._id}`} className="">
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
      <div className="text-yellow-500">
        <small>
          <StarRating rating={product.ratingsAverage} />
        </small>
        <span className="text-gray-500 text-sm px-2">
          {product.ratingsAverage} / 5 ({product.ratingsQuantity})
        </span>
      </div>

      {/* Price and Add to Cart Button */}
      <div className="flex items-center justify-between mt-3">
        <div className="text-black">{product.price} EGY</div>
        <button
          className="p-2 text-white bg-green-500 hover:bg-green-600 rounded"
          aria-label="Add to cart"
        >
          Add+
        </button>
      </div>
    </div>
  );
};

export default ProductCart;
