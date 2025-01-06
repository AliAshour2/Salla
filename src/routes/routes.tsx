import Layout from "@/components/LayOut/Layout";
import { CartPage } from "@/Pages/Cart/cart";
import CategoryPage from "@/Pages/CategoryViewer/CategoryPage";
import Home from "@/Pages/Home/Home";
import ProductViewer from "@/Pages/ProductViewer/ProductViewerPage";
import SettingPage from "@/Pages/Setting/SettingPage";
import WishlistPage from "@/Pages/Wishlist/WishlistPage";
import { createBrowserRouter } from "react-router-dom";


export const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "settings",
          element: <SettingPage />,
        },
        {
          path: "details/:id",
          element: <ProductViewer />,
        },
        {
          path: "wishlist",
          element: <WishlistPage />,
        },
        {
          path: "/category/:categoryId",
          element: <CategoryPage />,
        },
        {
          path:'cart',
          element:<CartPage/>
        }
      ],
    },
  ]);