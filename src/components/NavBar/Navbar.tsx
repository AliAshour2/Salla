import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Heart, ShoppingCart, ChevronDown, Menu, } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import AuthComponent from "../AuthComponent/AuthComponent";
import Modal from "./Modal";

import { selectIsLoggedIn } from "@/features/auth/slices/authSlice";
import useTextDirection from "@/hooks/useTextDirection"; 
import AccountAvatar from "./AccountAvatar";
import { Link } from "react-router-dom";
import { useGetWishListQuery } from "@/services/api/WishlistApi/WishlistApi";

export default function Navbar() {
  const { t } = useTranslation();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { data: wishlistData, isLoading: isLoadingWishlist, isError: isWishlistError } = useGetWishListQuery();

  const { direction, alignmentClass } = useTextDirection(); // Use the hook

  const closeModal = () => setModalOpen(false);
  const openSignInModal = () => {
    setIsSignIn(true);
    setModalOpen(true);
  };
  const openSignUpModal = () => {
    setIsSignIn(false);
    setModalOpen(true);
  };

  const handleClickOnWishList = () => {
    if (!isLoggedIn) {
      toast.error("Please login first");
      openSignInModal();
    }
  };

  const handleClickOnCart = () => {
    if (!isLoggedIn) {
      toast.error("Please login first");
      openSignInModal();
    }
  };

  const categories = [
    { id: 1, name: t("navbar.categories.1") },
    { id: 2, name: t("navbar.categories.2") },
    { id: 3, name: t("navbar.categories.3") },
    { id: 4, name: t("navbar.categories.4") },
  ];

  return (
    <header className={`w-full bg-background border-b ${alignmentClass}`} style={{ direction }}>
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link to={"/home"} className="text-2xl font-bold text-foreground">
              Salla
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to={'/home'} className="text-foreground hover:text-primary">
              {t("navbar.home")}
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0">
                  {t("navbar.categoriesDrop")} <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {categories.map((category) => (
                  <DropdownMenuItem key={category.id}>
                    {category.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <a href="#" className="text-foreground hover:text-primary">
              Account
            </a>
          </div>

          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" onClick={handleClickOnWishList} className="relative">
              <Heart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
               {wishlistData?.data?.length || 0}
              </span>
            </Button>
            <Button variant="ghost" size="icon" onClick={handleClickOnCart} className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                5
              </span>
            </Button>
            {isLoggedIn ? (
              <AccountAvatar />
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="ghost" onClick={openSignInModal}>
                  {t("navbar.login")}
                </Button>
                <Button onClick={openSignUpModal}>
                  {t("navbar.signup")}
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-4">
                  <a href="#" className="text-foreground hover:text-primary">
                    {t("navbar.home")}
                  </a>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="justify-start p-0">
                        {t("navbar.categoriesDrop")} <ChevronDown className="ml-1 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {categories.map((category) => (
                        <DropdownMenuItem key={category.id}>
                          {category.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <a href="#" className="text-foreground hover:text-primary">
                    Account
                  </a>
                  {!isLoggedIn && (
                    <>
                      <Button variant="ghost" onClick={openSignInModal}>
                        {t("navbar.login")}
                      </Button>
                      <Button onClick={openSignUpModal}>
                        {t("navbar.signup")}
                      </Button>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>

      {/* Auth Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <AuthComponent isSignIn={isSignIn} />
      </Modal>
    </header>
  );
}