import { Link } from "react-router-dom";
import StarRating from "./StarRaring";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { TproductCartProps } from "@/types";

const ProductCart = ({
  _id,
  title,
  category,
  imageCover,
  price,
  rating,
}: TproductCartProps) => {
  const handleAddToCart = () => {
    
    console.log(`Added product ${_id} to cart`);
  };

  return (
    <div className="relative rounded border p-3 group hover:border-green-500 hover:shadow-sm">
      <div className="text-center">
        <Link to={`details/${_id}`}>
          <img
            src={imageCover}
            alt={title}
            className="w-full h-auto rounded"
            onError={(e) => {
              e.currentTarget.src = "/path/to/placeholder/image.jpg"; // Placeholder image
            }}
          />
        </Link>
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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

      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger>
            <div className="text-sm my-1 mt-2">
              <Link to={`details/${_id}`} className="text-gray-500">
                {title.split(" ").slice(0, 2).join(" ")}
              </Link>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{title}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <h3 className="text-lg">
        <Link to={`details/${_id}`} className="text-black text-decoration-none">
          {category}
        </Link>
      </h3>
      <div className="text-yellow-500">
        <small>
          <StarRating rating={rating} />
        </small>
        <span className="text-gray-500 text-sm px-2">{rating}</span>
      </div>
      <div className="flex items-center justify-between mt-3">
        <div className="text-black">{price} EGY</div>
        <button
          className="p-2 text-white bg-green-400 rounded"
          onClick={handleAddToCart}
          aria-label="Add to cart"
        >
          Add+
        </button>
      </div>
    </div>
  );
};

export default ProductCart;
