import { useState, useEffect } from "react";
import logo from "../../assets/images/freshcart-logo.svg";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LogoutIcon from "@mui/icons-material/Logout";
import DehazeIcon from "@mui/icons-material/Dehaze";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../Context/User.context";
import { cartContext } from "../Context/Cart.context";
import { wishContext } from "../Context/Wishlist.context";

export default function Navbar() {
  const { token, Logout } = useContext(userContext);
  const { getLoggedUserCart, cartInfo, isCartLoading } =
    useContext(cartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const { wishInfo } = useContext(wishContext);

  const isWishListContainItem = wishInfo?.data?.length > 0;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    getLoggedUserCart();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <nav className="bg-blue-300 p-2 shadow-lg fixed left-0 right-0 top-0 z-50">
        <div className="container flex gap-10">
          <h1>
            <a
              className="flex items-center hover:scale-110 hover:rotate-3 transition-transform duration-300"
              href="/"
            >
              <img className="w-12" src={logo} alt="FreshCart Logo" />
              <span className="text-black font-bold">FreshCart</span>
            </a>
          </h1>
          {/* Main Content */}
          {token ? (
            <ul className="hidden lg:flex gap-5 items-center justify-center">
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:h-[2px] hover:before:w-full hover:font-bold
                 before:transition-[width] before:duration-300 before:bg-primary 
                 before:absolute before:left-0 before:-bottom-1 ${
                   isActive ? "font-bold before:w-full" : "before:w-0"
                 }`;
                  }}
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:h-[2px] hover:before:w-full hover:font-bold
                 before:transition-[width] before:duration-300 before:bg-primary 
                 before:absolute before:left-0 before:-bottom-1 ${
                   isActive ? "font-bold before:w-full" : "before:w-0"
                 }`;
                  }}
                  to="/allproducts"
                >
                  Products
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:h-[2px] hover:before:w-full hover:font-bold
                 before:transition-[width] before:duration-300 before:bg-primary 
                 before:absolute before:left-0 before:-bottom-1 ${
                   isActive ? "font-bold before:w-full" : "before:w-0"
                 }`;
                  }}
                  to="/allbrands"
                >
                  Brands
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return `relative before:h-[2px] hover:before:w-full hover:font-bold
                 before:transition-[width] before:duration-300 before:bg-primary 
                 before:absolute before:left-0 before:-bottom-1 ${
                   isActive ? "font-bold before:w-full" : "before:w-0"
                 }`;
                  }}
                  to="/allorders"
                >
                  Orders
                </NavLink>
              </li>
            </ul>
          ) : (
            ""
          )}
          {/* Cart Icon */}

          {token ? (
            <>
              <Link
                to="/wishlist"
                className="hidden lg:flex items-center justify-center hover:scale-125 hover:rotate-12 transition-transform duration-300"
              >
                <FavoriteOutlinedIcon
                  className={
                    isWishListContainItem ? "text-red-500" : "text-white"
                  }
                />
              </Link>
              <Link
                to="/cart"
                className="hidden lg:flex items-center mr-auto relative  "
              >
                <ShoppingCartIcon />
                <span className=" flex absolute text-xs top-0 right-0 translate-x-1/2 text-white bg-primary  w-5 h-5 items-center justify-center rounded-full">
                  {isCartLoading ? (
                    <CircularProgress color="inherit" size={"15px"} />
                  ) : (
                    cartInfo?.numOfCartItems || 0
                  )}
                </span>
              </Link>
            </>
          ) : (
            ""
          )}

          {/* Social Icons */}
          <ul className="hidden lg:flex gap-5 justify-center ms-auto items-center">
            <li className="hover:scale-125 hover:rotate-12 hover:text-primary transition-transform duration-300">
              <a href="https://facebook.com">
                <FacebookIcon fontSize="medium" />
              </a>
            </li>
            <li className="hover:scale-125 hover:rotate-12 transition-transform duration-300">
              <a href="https://twitter.com">
                <XIcon fontSize="medium" />
              </a>
            </li>
            <li className="hover:scale-125 hover:rotate-12 hover:text-orange-600 transition-transform duration-300 ">
              <a href="https://instagram.com">
                <InstagramIcon fontSize="medium" />
              </a>
            </li>
            <li className="hover:scale-125 hover:rotate-12 hover:text-red-500 transition-transform duration-300">
              <a href="https://youtube.com">
                <YouTubeIcon fontSize="medium" />
              </a>
            </li>
            <li className="hover:scale-125 hover:rotate-12 hover:text-green-500 transition-transform duration-300">
              <a href="https://whatsapp.com">
                <WhatsAppIcon fontSize="medium" />
              </a>
            </li>
          </ul>
          {/* Auth Links */}
          <ul className="hidden lg:flex gap-4 justify-center items-center">
            {!token ? (
              <>
                {" "}
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:h-[2px] hover:before:w-full hover:font-bold
                 before:transition-[width] before:duration-300 before:bg-primary 
                 before:absolute before:left-0 before:-bottom-1 ${
                   isActive ? "font-bold before:w-full" : "before:w-0"
                 }`;
                    }}
                    to="/auth/login"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:h-[2px] hover:before:w-full hover:font-bold
               before:transition-[width] before:duration-300 before:bg-primary 
               before:absolute before:left-0 before:-bottom-1 ${
                 isActive ? "font-bold before:w-full" : "before:w-0"
               }`;
                    }}
                    to="/auth/signup"
                  >
                    Sign Up
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="hover:text-primary cursor-pointer">
                <span onClick={Logout}>
                  <LogoutIcon />
                </span>
              </li>
            )}
          </ul>
          {/* toggleMenu */}
          <button
            onClick={toggleMenu}
            className="lg:hidden ms-auto"
            aria-label="Toggle menu"
          >
            <DehazeIcon fontSize="large" />{" "}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-blue-300 p-4 shadow-lg">
            {token ? (
              <div className="flex justify-center gap-8">
                {/* Main Content */}
                <ul className="flex gap-4 items-center justify-center">
                  <li>
                    <NavLink
                      className={({ isActive }) => {
                        return `relative before:h-[2px] hover:before:w-full hover:font-bold
                 before:transition-[width] before:duration-300 before:bg-primary 
                 before:absolute before:left-0 before:-bottom-1 ${
                   isActive ? "font-bold before:w-full" : "before:w-0"
                 }`;
                      }}
                      to="/"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) => {
                        return `relative before:h-[2px] hover:before:w-full hover:font-bold
                 before:transition-[width] before:duration-300 before:bg-primary 
                 before:absolute before:left-0 before:-bottom-1 ${
                   isActive ? "font-bold before:w-full" : "before:w-0"
                 }`;
                      }}
                      to="/allproducts"
                    >
                      Products
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      className={({ isActive }) => {
                        return `relative before:h-[2px] hover:before:w-full hover:font-bold
                 before:transition-[width] before:duration-300 before:bg-primary 
                 before:absolute before:left-0 before:-bottom-1 ${
                   isActive ? "font-bold before:w-full" : "before:w-0"
                 }`;
                      }}
                      to="/allbrands"
                    >
                      Brands
                    </NavLink>
                  </li>
                </ul>
                {/* cart icon */}
                <div className="flex gap-5">
                  <Link
                    to="/wishlist"
                    className="flex items-center justify-center hover:scale-125 hover:rotate-12 transition-transform duration-300"
                  >
                    <FavoriteOutlinedIcon
                      className={
                        isWishListContainItem ? "text-red-700" : "text-white"
                      }
                    />
                  </Link>
                  <Link to="/cart" className="flex relative items-center ">
                    <ShoppingCartIcon />
                    <span className="bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">
                      {isCartLoading ? (
                        <CircularProgress color="inherit" size={"15px"} />
                      ) : (
                        cartInfo?.numOfCartItems || 0
                      )}
                    </span>
                  </Link>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="flex justify-center gap-8 items-center mt-3">
              {/* Social Icons */}
              <ul className="flex gap-6 justify-center items-center">
                <li className="hover:scale-125 hover:rotate-12 hover:text-primary transition-transform duration-300">
                  <a href="https://facebook.com">
                    <FacebookIcon />
                  </a>
                </li>
                <li className="hover:scale-125 hover:rotate-12 transition-transform duration-300">
                  <a href="https://x.com/A7madSoliman92">
                    <XIcon />
                  </a>
                </li>
                <li className="hover:scale-125 hover:rotate-12 hover:text-orange-600 transition-transform duration-300 ">
                  <a href="https://instagram.com">
                    <InstagramIcon />
                  </a>
                </li>
                <li className="hover:scale-125 hover:rotate-12 hover:text-red-500 transition-transform duration-300">
                  <a href="https://youtube.com">
                    <YouTubeIcon />
                  </a>
                </li>
                <li className="hover:scale-125 hover:rotate-12 hover:text-green-500 transition-transform duration-300">
                  <a href="https://whatsapp.com">
                    <WhatsAppIcon />
                  </a>
                </li>
              </ul>

              {/* Auth Links */}
              <ul className="flex gap-4 justify-center items-center">
                {!token ? (
                  <>
                    <li>
                      <NavLink
                        className={({ isActive }) => {
                          return `relative before:h-[2px] hover:before:w-full hover:font-bold
               before:transition-[width] before:duration-300 before:bg-primary 
               before:absolute before:left-0 before:-bottom-1 ${
                 isActive ? "font-bold before:w-full" : "before:w-0"
               }`;
                        }}
                        to="/login"
                      >
                        Login
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className={({ isActive }) => {
                          return `relative before:h-[2px] hover:before:w-full hover:font-bold
               before:transition-[width] before:duration-300 before:bg-primary 
               before:absolute before:left-0 before:-bottom-1 ${
                 isActive ? "font-bold before:w-full" : "before:w-0"
               }`;
                        }}
                        to="/auth/signup"
                      >
                        Sign Up
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <li className="hover:text-primary cursor-pointer">
                    <span onClick={Logout}>
                      <LogoutIcon />
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
      </nav>

      {/* Scroll to Top Button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-32 z-50 right-8 w-10 h-10 flex items-center justify-center rounded-lg shadow-md bg-white"
          aria-label="Scroll to top"
        >
          <ArrowUpwardIcon className="text-primary text-3xl" />
        </button>
      )}
    </>
  );
}
