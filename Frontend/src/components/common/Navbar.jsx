import React, { useState, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom"; 


const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoginStatus = async () => {
      try {
        const userId=localStorage.getItem("UserID");
        console.log(userId);
        if(userId)
          setIsLoggedIn(true); 
      } catch (error) {
        console.error("Error fetching login status:", error);
      }
    };
    fetchLoginStatus();
  }, []);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("UserID");
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleSearch = () => {
    navigate(`/products?search=${searchQuery}`);
  };

  return (
    <nav className="shadow-lg">
      <div className="container mx-auto flex items-center justify-between p-4">

        <div className="text-3xl font-extrabold text-theme">
          <a href="/">BuyKaro.</a>
        </div>

        <div className="flex items-center space-x-4 w-full max-w-lg">
          <div className="relative group">
            <button className="py-2 px-4 rounded-md flex items-center hover:text-theme" id="category-menu-button">
              Categories
              <FiChevronDown size={18} className="ml-2" />
            </button>
            <div className="absolute p-3 flex flex-col items-start right-0 mt-2 w-36 bg-white text-black rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:mt-2 transition-all" id="category-menu">
              <Link to="/products?search=electronics" 
              className="block hover:text-theme hover:underline text-gray-600 text-md">
                Electronics
              </Link>
              <Link to="/products?search=Sports" 
              className="block hover:text-theme hover:underline text-gray-600 text-md">
                Sports
              </Link>
              <Link to="/products?search=Books" 
              className="block hover:text-theme hover:underline text-gray-600 text-md">
                Books
              </Link>
            </div>
          </div>

          <div className="flex-grow flex items-center border border-theme rounded-md bg-white">
            <input type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products" className="w-full px-4 py-2 focus:outline-none" />
            <FaSearch size={20} className="gray-800 mr-4" onClick={handleSearch}/>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative group">
            <button className="py-2 px-4 rounded-md flex items-center hover:text-theme" id="profile-menu-button">
              {isLoggedIn ? "Profile" : "Hello, Sign In"}
              <FiChevronDown size={18} className="ml-2" />
            </button>
            <div className="absolute right-0 mt-2 w-fit bg-white text-black rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:mt-2 transition-all" id="profile-menu">
              {isLoggedIn ? (
                <div className="flex bg-white w-32 shadow-md flex-col justify-center items-start py-4 max-h-fit px-2">
                  <Link to="/youracc" className="block hover:text-theme hover:underline text-gray-600 text-sm">
                    Your Account
                  </Link>
                  <Link to="/order" className="block hover:text-theme hover:underline text-gray-600 text-sm">
                    Your Orders
                  </Link>
                  <Link className="block hover:text-theme hover:underline text-gray-600 text-sm">
                    Explore
                  </Link>
                  <hr className="h-1 bg-gray-500 border-1 w-full border-gray-500 my-3 rounded-sm"></hr>
                  <button onClick={handleLogout} className="block hover:text-theme hover:underline text-gray-600 text-sm">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex bg-white w-40 shadow-md flex-col justify-center items-center py-4 max-h-fit">
                  <Link to="/login" className="px-4 py-2 bg-theme text-white hover:text-orange-200 w-3/4 rounded-md flex justify-center">
                    SIGN IN
                  </Link>
                  <div className="text-xs">
                    New Customers?{" "}
                    <Link to="/signin" className="text-theme hover:text-orange-200 underline">
                      Start here
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Link to="/cart" className="relative">
            <button className="py-2 px-4 rounded-md focus:outline-none flex items-center hover:text-theme" id="cart-button">
              <IoCart size={20} className="text-theme" />
              <span className="ml-1">Cart</span>
              {/* Display dynamic cart item count */}
              {/* {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-xs text-white px-2 rounded-full -mt-2 -mr-2">
                  {cartCount}
                </span>
              )} */}
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-gray-700 flex text-gray-300 gap-4 py-2 px-5 font-semibold">
        <Link className="hover:underline">Sell</Link>
        <Link to="/products?search=fashion" className="hover:underline">Fashion</Link>
        <Link to="/products?search=health&personalcare" className="hover:underline">Health & Personal Care</Link>
        <Link to="/products?search=fresh" className="hover:underline">Fresh</Link>
        <Link to="/products?search=home" className="hover:underline">HouseHold</Link>
        <Link to="/order" className="hover:underline">Buy again</Link>
        <Link to="/products?search=Giftcards" className="hover:underline">Gift Cards</Link>
      </div>
    </nav>
  );
};

export default Navbar;
