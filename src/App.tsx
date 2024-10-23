import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/LayOut/Layout";
import Home from "./Pages/Home/Home";
import SettingPage from "./Pages/Setting/SettingPage";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductViewer from "./Pages/ProductViewer/ProductViewerPage";

function App() {
  const routes = createBrowserRouter([
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
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
