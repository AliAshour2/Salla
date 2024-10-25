const ProductViewPageSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto p-4">
    <div className="md:flex md:space-x-6">
      {/* Image Skeleton */}
      <div className="md:w-1/2 relative">
        <div className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="mt-4 flex space-x-2 overflow-x-auto scrollbar-hide">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="w-24 h-24 bg-gray-200 rounded-md animate-pulse"></div>
          ))}
        </div>
      </div>

      {/* Product Details Skeleton */}
      <div className="md:w-1/2 mt-6 md:mt-0">
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-2 animate-pulse"></div>
        <div className="h-8 bg-gray-200 rounded mb-4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded mb-4 w-full animate-pulse"></div>
        <div className="mt-4 flex items-center">
          <div className="h-8 bg-gray-200 rounded w-1/4 mr-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-1/6 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded ml-auto w-1/4 animate-pulse"></div>
        </div>
        <div className="text-yellow-500 mt-2">
          <small>
            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
          </small>
          <div className="h-4 bg-gray-200 rounded w-1/3 mt-1 animate-pulse"></div>
        </div>
        <div className="mt-6 flex items-center">
          <div className="h-10 bg-gray-200 rounded w-10 mr-2 animate-pulse"></div>
          <span className="mx-4 font-bold h-6 bg-gray-200 rounded w-10 animate-pulse"></span>
          <div className="h-10 bg-gray-200 rounded w-10 ml-2 animate-pulse"></div>
        </div>
        <div className="mt-6 h-12 bg-green-500 rounded animate-pulse"></div>
      </div>
    </div>
  </div>
  )
}

export default ProductViewPageSkeleton