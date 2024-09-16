import { useState } from "react";
import { useTranslation } from "react-i18next";
import AuthComponent from "../AuthComponent/AuthComponent";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsLoggedIn } from "@/features/auth/slices/authSlice";
import AccountAvatar from "./AccountAvatar";
import Modal from "./Modal";
import { Heart, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  const closeModal = () => {
    setModalOpen(false);
  };
  const openSignInModal = () => {
    setIsSignIn(true);
    setModalOpen(true);
  };

  const openSignUpModal = () => {
    setIsSignIn(false);
    setModalOpen(true);
  };

  const handleClickOnWishList = () => {
    if(!isLoggedIn){
      toast.error("Please login first");
      openSignInModal();
    }
  }

  const handleClickOnCart = () =>{
    if(!isLoggedIn){
      toast.error("Please login first");
      openSignInModal();
  }
  }




  const handleLogout = () => {
    dispatch(logout());
  };
  interface Category {
    id: number;
    name: string;
  }

  const categories: Category[] = [
    { id: 1, name: t("navbar.categories.1") },
    { id: 2, name: t("navbar.categories.2") },
    { id: 3, name: t("navbar.categories.3") },
    { id: 4, name: t("navbar.categories.4") },
  ];

  return (
    <>
      {/* ========== HEADER ========== */}
      <header className="flex flex-wrap py-3  md:justify-start md:flex-nowrap z-50 w-full bg-white border-b border-gray-200">
        <nav className="relative max-w-[85rem] w-full mx-auto md:flex md:items-center md:justify-between md:gap-3 py-2 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center gap-x-1">
            <a
              className="flex-none font-semibold text-xl text-black focus:outline-none focus:opacity-80"
              href="#"
              aria-label="Brand"
            >
              Salla
            </a>
            {/* Collapse Button */}
            <button
              type="button"
              className="hs-collapse-toggle md:hidden relative size-9 flex justify-center items-center font-medium text-[12px] rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
              id="hs-header-base-collapse"
              aria-expanded="false"
              aria-controls="hs-header-base"
              aria-label="Toggle navigation"
              data-hs-collapse="#hs-header-base"
            >
              <svg
                className="hs-collapse-open:hidden size-4"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1={3} x2={21} y1={6} y2={6} />
                <line x1={3} x2={21} y1={12} y2={12} />
                <line x1={3} x2={21} y1={18} y2={18} />
              </svg>
              <svg
                className="hs-collapse-open:block shrink-0 hidden size-4"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
              <span className="sr-only">Toggle navigation</span>
            </button>
            {/* End Collapse Button */}
          </div>
          {/* Collapse */}
          <div
            id="hs-header-base"
            className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block "
            aria-labelledby="hs-header-base-collapse"
          >
            <div className="overflow-hidden overflow-y-auto max-h-[75vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
              <div className="py-2 md:py-0  flex flex-col md:flex-row md:items-center gap-0.5 md:gap-1">
                <div className="grow md:flex md:justify-center">
                  <div className="flex flex-col md:flex-row md:justify-end md:items-center gap-0.5 md:gap-1">
                    <a
                      className="p-2 flex items-center text-sm bg-gray-100 text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100"
                      href="#"
                      aria-current="page"
                    >
                      {t("navbar.home")}
                    </a>
                    {/* Dropdown */}
                    <div className="hs-dropdown [--strategy:static] md:[--strategy:fixed] [--adaptive:none] [--is-collapse:true] md:[--is-collapse:false] ">
                      <button
                        id="hs-header-base-dropdown"
                        type="button"
                        className="hs-dropdown-toggle w-full p-2 flex items-center text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100"
                        aria-haspopup="menu"
                        aria-expanded="false"
                        aria-label="Dropdown"
                      >
                        {t("navbar.categoriesDrop")}
                        <i className=" ml-1 fa-solid fa-caret-down"></i>
                      </button>
                      <div
                        className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] md:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 relative w-full md:w-52 hidden z-10 top-full ps-7 md:ps-0 md:bg-white md:rounded-lg md:shadow-md before:absolute before:-top-4 before:start-0 before:w-full before:h-5 md:after:hidden after:absolute after:top-1 after:start-[18px] after:w-0.5 after:h-[calc(100%-0.25rem)] after:bg-gray-100"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="hs-header-base-dropdown"
                      >
                        <div className="py-1 md:px-1 space-y-0.5">
                          {categories.map((category) => (
                            <a
                              className="p-2 md:px-3 flex items-center text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                              href="#"
                            >
                              {category.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* End Dropdown */}
                    <a
                      className="p-2 flex items-center text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100"
                      href="#"
                    >
                      Account
                    </a>
                  </div>
                </div>

             

                 

                {/* Button Group */}

                <div className="flex gap-2">
                
                <Heart  onClick={handleClickOnWishList}  />
                <ShoppingCart onClick={handleClickOnCart} />
                </div>
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="py-[7px] px-2.5 inline-flex items-center font-medium text-sm rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100"
                  >
                    {t("navbar.logout")}
                  </button>
                ) : (
                  <div className=" flex flex-wrap items-center gap-x-1.5">
                    <button
                      className="py-[7px] px-2.5 inline-flex items-center font-medium text-sm rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100"
                      onClick={openSignInModal}
                    >
                      {t("navbar.login")}
                    </button>
                    <button
                      className="py-2 px-2.5 inline-flex items-center font-medium text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                      onClick={openSignUpModal}
                    >
                      {t("navbar.signup")}
                    </button>
                  </div>
                )}
                {/* End Button Group */}
              </div>
            </div>
          </div>
          {/* End Collapse */}
        </nav>
      </header>
      {/* ========== END HEADER ========== */}
      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <AuthComponent isSignIn={isSignIn} />
      </Modal>
    </>
  );
};

export default Navbar;
