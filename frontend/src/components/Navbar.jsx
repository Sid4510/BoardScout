import { useState, useContext } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="shadow-lg font-body fixed top-0 left-0 w-full bg-gray-100 z-50">
      <div className="border-t">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-4xl font-headline font-bold text-gray-900">
            <a href="/">BoardScout</a>
          </div>

          <div className="flex items-center space-x-4">
            {!user ? (
              <>
                <a
                  href="/signup"
                  className="px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-900 rounded hover:bg-gray-200"
                >
                  Sign Up
                </a>
                <a
                  href="/login"
                  className="px-4 py-2 text-sm font-semibold text-white bg-gray-700 rounded hover:bg-gray-800"
                >
                  Log In
                </a>
              </>
            ) : (
              <div className="relative">
                <div
                  onClick={toggleDropdown}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 text-lg font-semibold cursor-pointer"
                  title={user?.name || "User"}
                >
                  {user?.name ? user.name[0] : "U"}
                </div>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 font-headline bg-white border border-gray-300 rounded shadow-md z-50">
                    <ul className="py-1 text-sm text-gray-700">
                      <li>
                        <a
                          href="/myaccount"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          My Account
                        </a>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Log Out
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
