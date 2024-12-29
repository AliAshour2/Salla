export type TBrand = {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export type TproductCartProps = {
  _id: string;
  imageCover: string;
  images : string[];
  title: string;
  price: number;
  sold: number;
  rating: number;
  description :string
  quantity :number
  category: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
  brand: {
    id: string;
    name: string;
  };
  name: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  count : number;
};

export interface GetSpecificProductResponse {
  data: TproductCartProps;
}

export type TGetAllProductsParamsProps = {
  priceGte?: number;
  priceLte?: number;
  limit?: number;
  page?: number;
  sort?: string;
  fields?: string;
  keyword?: string;
  brand?: string;
  categories?: string[];
  categoryIn?: string;
};
