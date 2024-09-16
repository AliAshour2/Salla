import { Outlet } from "react-router-dom";
import { Toaster } from 'sonner';
import Navbar from "../NavBar/Navbar";
import { Ban } from "lucide-react";

const Layout = () => {
  return (
    <>
     <Toaster 
      position="bottom-center"
      icons={{ error: <Ban className="text-red-500"/> }}
      />
     <Navbar/>
      <Outlet/>
    </>
  )
}

export default Layout