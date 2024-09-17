import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './components/LayOut/Layout'
import Home from './Pages/Home/Home'
import SettingPage from './Pages/Setting/SettingPage'


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
          path :"settings",
          element: <SettingPage />
        }
      ],
    },
  ]);

  return (
    <>
       <RouterProvider router={routes} />
    </>
  )
}

export default App
