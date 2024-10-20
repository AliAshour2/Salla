// src/components/Products.tsx

import { useGetAllProductsQuery } from '@/services/api/GetAllProductsApi/GetAllProductsApi';
import { TproductCartProps } from '@/types';

const Products = () => {
  const { data, error, isLoading } = useGetAllProductsQuery({
    
    
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {data?.data?.map((product: TproductCartProps) => (
          <li key={product.title}>{product.title} - {product.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
