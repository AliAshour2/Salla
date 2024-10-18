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
    category: string;
    ratingsAverage: number;
    ratingsQuantity: number;
  }