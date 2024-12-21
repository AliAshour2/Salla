import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ProductCart from '@/components/shared/ProductCart';
import { useGetAllProductsQuery } from '@/services/api/ProductsApi/ProductsApi';
import { TproductCartProps } from '@/types';

const sortOptions = [
  { value: '-createdAt', label: 'Newest' },
  { value: 'price', label: 'Price: Low to High' },
  { value: '-price', label: 'Price: High to Low' },
  { value: '-ratingsAverage', label: 'Top Rated' },
];

const CategoryPage = () => {
  const { categoryId } = useParams(); // Get categoryId from URL
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [categoryId]);

  // Get all filter values from URL
  const sort = searchParams.get('sort') || '-createdAt';
  const price = searchParams.get('price') || '';
  const rating = searchParams.get('rating') || '';

  const { data, isLoading, isFetching, error } = useGetAllProductsQuery({
    page: currentPage,
    category: categoryId, // Use categoryId from URL params
    sort,
    price,
    rating,
  }, {
    // This ensures the query is re-fetched when categoryId changes
    skip: !categoryId
  });

  const handleSortChange = (value: string) => {
    searchParams.set('sort', value);
    setSearchParams(searchParams);
  };

  const handlePriceFilter = (min: string, max: string) => {
    searchParams.set('price', `${min},${max}`);
    setSearchParams(searchParams);
    setCurrentPage(1); // Reset page when filter changes
  };

  const handleRatingFilter = (rating: string) => {
    searchParams.set('rating', rating);
    setSearchParams(searchParams);
    setCurrentPage(1); // Reset page when filter changes
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-gray-200 rounded-lg h-[300px]"
            />
          ))}
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">
          <i className="fas fa-exclamation-triangle text-4xl mb-4"></i>
          <h2 className="text-2xl font-bold">Error Loading Products</h2>
          <p>Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filters Section */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-800">
            {data?.category?.name || 'Products'} {/* Show category name if available */}
          </h1>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <label className="text-gray-600">Sort by:</label>
            <select
              value={sort}
              onChange={(e) => handleSortChange(e.target.value)}
              className="border rounded-md px-3 py-2 focus:outline-none focus:border-green-500"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-4 flex flex-wrap gap-4">
          {/* Price Range Filter */}
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min Price"
              className="border rounded-md px-3 py-2 w-24"
              onChange={(e) => {
                const [, max] = price.split(',');
                handlePriceFilter(e.target.value, max || '');
              }}
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max Price"
              className="border rounded-md px-3 py-2 w-24"
              onChange={(e) => {
                const [min] = price.split(',');
                handlePriceFilter(min || '', e.target.value);
              }}
            />
          </div>

          {/* Rating Filter */}
          <select
            value={rating}
            onChange={(e) => handleRatingFilter(e.target.value)}
            className="border rounded-md px-3 py-2"
          >
            <option value="">All Ratings</option>
            <option value="4">4+ Stars</option>
            <option value="3">3+ Stars</option>
            <option value="2">2+ Stars</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.data.map((product : TproductCartProps) => (
          <ProductCart
            key={product._id}
            product={product}
            initialIsInWishlist={false}
          />
        ))}
      </div>

      {/* Show loading overlay when fetching new page */}
      {isFetching && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      )}

      {/* Pagination */}
      {data && data.numberOfPages > 1 && (
        <div className="mt-8 flex justify-center">
          <div className="flex gap-2">
            {[...Array(data.numberOfPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === index + 1
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                disabled={isFetching}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* No Products Found */}
      {data?.data.length === 0 && (
        <div className="text-center py-8">
          <i className="fas fa-box-open text-4xl text-gray-400 mb-4"></i>
          <h2 className="text-2xl font-semibold text-gray-600">
            No Products Found
          </h2>
          <p className="text-gray-500 mt-2">
            Try adjusting your filters to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;