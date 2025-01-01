import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetCartQuery, useRemoveProductFromCartMutation, useUpdateCartMutation } from "@/services/api/cart/CartApi";
import { TproductCartProps } from "@/types";
import { CartSkeleton } from "@/components/skeletons/CartSkeleton";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export function CartPage() {
  const { data: cartData, isLoading, error } = useGetCartQuery({});
  const [removeProductFromCart] = useRemoveProductFromCartMutation();
  const [updateCart] = useUpdateCartMutation();

  const handleUpdateCart = async (item: { _id: string; count: number }, newCount: string) => {
    const toastId = `update-cart-${item._id}`;
    try {
      toast.loading("Updating cart...", { id: toastId });
      await updateCart({ _id: item._id, count: parseInt(newCount, 10) }).unwrap();
      toast.success("Cart updated successfully", { id: toastId });
    } catch (error) {
      console.error("Update cart operation failed:", error);
      toast.error("Failed to update cart", { id: toastId });
    }
  };

  const handleRemoveProduct = async (product: TproductCartProps) => {
    const toastId = `remove-product-${product._id}`;
    try {
      toast.loading("Removing product...", { id: toastId });
      await removeProductFromCart(product).unwrap();
      toast.success("Product removed from cart", { id: toastId });
    } catch (error) {
      console.error("Remove product operation failed:", error);
      toast.error("Failed to remove product from cart", { id: toastId });
    }
  };

  if (isLoading) {
    return <CartSkeleton />;
  }

  if (error) {
    return <div>Failed to load cart. Please try again later.</div>;
  }

  if (!cartData || !cartData.data || !cartData.data.products) {
    return <div>No items in the cart.</div>;
  }

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 ">
      <div className="lg:col-span-2 ">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-black">Cart Items</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cartData.data.products.map((item: { count: number; _id: string; product: TproductCartProps; price: number }) => (
              <div key={item._id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <img src={item.product.imageCover} alt={item.product.title} className="w-24 h-24 rounded" />
                <div className="flex-grow space-y-2">
                  <Link to={`/details/${item.product._id}`} className="text-lg font-semibold text-gray-600 hover:text-green-500">{item.product.title}</Link>
                  <p className="text-gray-500">{item.price} EGY</p>
                </div>
                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  <button
                    className="bg-gray-100 hover:bg-gray-300 text-primary px-4 py-2 rounded-md"
                    onClick={() => handleUpdateCart(item, (item.count - 1).toString())}
                    disabled={item.count === 1}
                  >
                    -
                  </button>
                  <span className="mx-4 font-bold">{item.count}</span>
                  <button
                    className="bg-gray-100 hover:bg-gray-300 text-primary px-4 py-2 rounded-md"
                    onClick={() => handleUpdateCart(item, (item.count + 1).toString())}
                  >
                    +
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                    onClick={() => handleRemoveProduct(item.product)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      <div>
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{cartData.data.totalCartPrice} EGY</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>{/* Add tax calculation if available */} EGY</span>
            </div>
            <div className="flex justify-between">
              <span>Total</span>
              <span>{cartData.data.totalCartPrice} EGY</span>
            </div>
          </CardContent>
          <CardFooter>
            <button className="h-10 w-full bg-green-500 hover:bg-green-600 text-white rounded-md">
              Checkout
            </button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}