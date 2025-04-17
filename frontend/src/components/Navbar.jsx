import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate, Link } from "react-router-dom";
import { FaSearch, FaUser, FaSignOutAlt, FaUserCircle, FaBars, FaTimes, FaChartBar } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={`font-body fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? "bg-white shadow-md py-2" : "bg-gray-100 py-4"
    }`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-3xl font-headline font-bold text-gray-900 flex items-center">
            <span className="bg-gray-900 text-white px-2 py-1 rounded mr-1">Board</span>
            <span>Scout</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="font-medium text-gray-700 hover:text-gray-900 transition-colors">
            Home
          </Link>
          <Link to="/find-billboards" className="font-medium text-gray-700 hover:text-gray-900 transition-colors">
            Find Billboards
          </Link>
          <Link to="/create-billboard" className="font-medium text-blue-600 hover:text-blue-800 transition-colors font-semibold">
            Create Billboard
          </Link>
          <Link to="/add-billboard" className="font-medium text-gray-700 hover:text-gray-900 transition-colors">
            Add Billboard
          </Link>
          <Link to="/analytics" className="font-medium text-gray-700 hover:text-gray-900 transition-colors">
            Analytics
          </Link>
          <Link to="/about" className="font-medium text-gray-700 hover:text-gray-900 transition-colors">
            About
          </Link>
          <Link to="/contact" className="font-medium text-gray-700 hover:text-gray-900 transition-colors">
            Contact
          </Link>
          
          {!user ? (
            <div className="flex items-center space-x-3">
              <Link
                to="/signup"
                className="px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-900 rounded-md hover:bg-gray-200 transition-colors"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-semibold text-white bg-gray-900 rounded-md hover:bg-gray-800 transition-colors"
              >
                Log In
              </Link>
            </div>
          ) : (
            <div className="relative">
              <div
                onClick={toggleDropdown}
                className="flex items-center space-x-2 cursor-pointer p-1 rounded-full hover:bg-gray-200 transition-colors"
              >
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 text-white text-sm overflow-hidden">
                  {user.profileImage ? (
                    <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    user?.name ? user.name[0].toUpperCase() : <FaUserCircle className="w-5 h-5" />
                  )}
                </div>
                <span className="font-medium text-gray-700">{user?.name?.split(' ')[0]}</span>
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                  <div className="p-3 border-b border-gray-200">
                    <p className="text-sm text-gray-500">Signed in as</p>
                    <p className="font-medium text-gray-900 truncate">{user?.name}</p>
                  </div>
                  <ul className="py-1">
                    <li>
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <FaUser className="mr-2 text-gray-500" />
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dashboard"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <FaUser className="mr-2 text-gray-500" />
                        Dashboard
                      </Link>
                    </li>
                    <li className="border-t border-gray-200">
                      <button
                        onClick={() => {
                          handleLogout();
                          setDropdownOpen(false);
                        }}
                        className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <FaSignOutAlt className="mr-2" />
                        Log Out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          {user && (
            <div
              onClick={toggleDropdown}
              className="mr-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-white text-sm overflow-hidden"
            >
              {user.profileImage ? (
                <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                user?.name ? user.name[0].toUpperCase() : <FaUserCircle className="w-4 h-4" />
              )}
            </div>
          )}
          <button 
            onClick={toggleMobileMenu}
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            {mobileMenuOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="text-gray-500 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/find-billboards"
              className="text-gray-500 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Find Billboards
            </Link>
            <Link
              to="/create-billboard"
              className="text-blue-600 hover:text-blue-800 block px-3 py-2 rounded-md text-base font-medium font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Create Billboard
            </Link>
            <Link
              to="/add-billboard"
              className="text-gray-500 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Add Billboard
            </Link>
            <Link
              to="/analytics"
              className="text-gray-500 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Analytics
            </Link>
            <Link
              to="/about"
              className="text-gray-500 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-500 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            {!user ? (
              <div className="mt-4 space-y-2">
                <Link
                  to="/signup"
                  className="block w-full px-4 py-2 text-center text-sm font-semibold text-gray-700 border border-gray-900 rounded-md hover:bg-gray-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="block w-full px-4 py-2 text-center text-sm font-semibold text-white bg-gray-900 rounded-md hover:bg-gray-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log In
                </Link>
              </div>
            ) : (
              <div className="mt-4 border-t border-gray-200 pt-4">
                <Link
                  to="/profile"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-200 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Profile
                </Link>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-200 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/analytics"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-200 rounded-md flex items-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaChartBar className="mr-2 text-gray-500" />
                  Analytics Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-gray-200 rounded-md"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
