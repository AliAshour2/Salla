import {RouterProvider } from "react-router-dom";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { routes } from "./routes/routes";

function App() {
    return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
