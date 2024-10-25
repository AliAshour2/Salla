import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useGetSpecificProductQuery } from "@/services/api/ProductsApi/ProductsApi";
import StarRating from "@/components/shared/StarRaring";
import ProductViewPageSkeleton from "@/components/skeletons/ProductViewPageSkeleton";

export default function ProductViewer() {
  const { id } = useParams(); // Get the product ID from the URL
  const { data: product, error, isLoading } = useGetSpecificProductQuery(id!); // Fetch the specific product
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  // Functions for handling image navigation
  const nextImage = () =>
    setCurrentImage((prev) => (prev + 1) % (product?.images.length || 1));
  const prevImage = () =>
    setCurrentImage(
      (prev) =>
        (prev - 1 + (product?.images.length || 1)) %
        (product?.images.length || 1)
    );

  const scrollThumbnails = (index: number) => {
    if (thumbnailsRef.current) {
      const thumbnail = thumbnailsRef.current.children[index] as HTMLElement;
      thumbnailsRef.current.scrollTo({
        left:
          thumbnail.offsetLeft -
          thumbnailsRef.current.offsetWidth / 2 +
          thumbnail.offsetWidth / 2,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (!isLoading && product) {
      scrollThumbnails(currentImage);
    }
  }, [currentImage, isLoading, product]);

  // Return early if loading or error state
  if (isLoading) {
    return <ProductViewPageSkeleton/>;
  }

  if (error) {
    return <div>Failed to load product. Please try again later.</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="md:flex md:space-x-6">
        {/* Image Gallery */}
        <div className="md:w-1/2 relative">
          <img
            src={product.images[currentImage]}
            alt={`Product image ${currentImage + 1}`}
            className="w-fit h-1/2 max-sm:h-1/6 max-md:h-1/3 rounded-lg cursor-pointer"
            onClick={() => setShowGallery(true)}
          />

          <div
            ref={thumbnailsRef}
            className="mt-4 flex space-x-2 overflow-x-auto scrollbar-hide"
          >
            {product.images.map((img: string, index: number) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`w-20 h-20 flex-shrink-0 object-cover rounded-md cursor-pointer ${
                  index === currentImage ? "border-2 border-primary" : ""
                }`}
                onClick={() => {
                  setCurrentImage(index);
                  scrollThumbnails(index);
                }}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 mt-6 md:mt-0">
          <h2 className="text-sm text-gray-500 uppercase">
            {product.brand?.name}
          </h2>
          <h1 className="text-3xl font-bold mt-2">{product.title}</h1>
          <p className="mt-4 text-gray-600">{product.description}</p>
          

          <div className="mt-4 flex items-center">
            <span className="text-3xl font-bold text-green-500">
              {product.price} EGY
            </span>

            <span className="ml-2 bg-primary/10 text-primary px-2 py-1 rounded-md">
              {50}%
            </span>

            <span className="ml-auto text-gray-400 line-through">
              {" "}
              {(product.price ? product.price * 2 : 0).toFixed(2)} EGY
            </span>
          </div>
          <div className="text-yellow-500 mt-2">
            <small>
              <StarRating rating={product.ratingsAverage} />
            </small>
            <span className="text-gray-500 text-sm px-2">
              {product.ratingsAverage} / 5 ({product.ratingsQuantity})
            </span>
          </div>

          {/* Quantity Selector */}
          <div className="mt-6 flex items-center">
            <button
              className={`${quantity === 0 ? 'opacity-50 disabled cursor-not-allowed ' : 'hover:bg-gray-300'} bg-gray-100  text-primary px-4 py-2 rounded-md`}
              onClick={() => setQuantity(Math.max(0, quantity - 1))}
            >
              -
            </button>
            <span className="mx-4 font-bold">{quantity}</span>
            <button
              className="bg-gray-100 hover:bg-gray-300 text-primary px-4 py-2 rounded-md"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <button className="mt-6 w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-md flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            Add to cart
          </button>
        </div>
      </div>

      {/* Full Screen Gallery */}
      {showGallery && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative max-w-md w-full">
            <button
              className="absolute top-4 right-4 text-black hover:text-red-800"
              onClick={() => setShowGallery(false)}
              
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={product.images[currentImage]}
              alt={`Full size product image ${currentImage + 1}`}
              className="w-full h-auto max-h-96"
            />
            <button
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full p-2"
              onClick={prevImage}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-2"
              onClick={nextImage}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
