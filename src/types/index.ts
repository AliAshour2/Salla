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
    title: string;
    price: number;
    sold: number;
    rating: number;
    category: {
      _id: string; 
      name: string; 
      slug: string;
      image:string
    };
    name: string;
    ratingsAverage: number;
    ratingsQuantity: number;
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
    categoryIn?:string;
  }



  