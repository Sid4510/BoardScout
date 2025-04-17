import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaMapMarkerAlt, FaDollarSign } from "react-icons/fa";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("billboards");

  return (
    <div className="bg-gray-50 min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-5">
            <div className="border-b border-gray-200 pb-5 mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
              <div className="flex mt-2">
                <Link 
                  to="/profile" 
                  className="text-sm mr-4 text-gray-600 hover:text-gray-900"
                >
                  My Profile
                </Link>
                <button
                  onClick={() => setActiveTab("billboards")}
                  className={`text-sm mr-4 ${
                    activeTab === "billboards"
                      ? "text-gray-900 font-medium"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  My Billboards
                </button>
              </div>
            </div>
            
            {/* Dashboard content would go here */}
            <div className="py-4">
              <p>Welcome to your BoardScout dashboard!</p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/istockphoto-599141442-612x612.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/30"></div>

        <div
      className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/image.jpg')" }} 
    >
      <div className="absolute inset-0 bg-black/10"></div> 

      <div className="relative flex flex-col items-center justify-center text-center px-6 py-24 pt-44">
        <motion.div
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1, ease: "easeOut" }} 
          className="p-10 rounded-lg inline-block"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="text-5xl font-extrabold text-gray-900 sm:text-6xl md:text-7xl"
          >
            Rent Your Perfect Billboard
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
            className="mt-4 max-w-2xl mx-auto text-lg text-gray-800"
          >
            Discover and rent premium billboard locations to maximize your
            advertising impact.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
            className="mt-8 flex justify-center gap-4"
          >
            <a
              href="#search"
              className="px-6 py-3 text-lg font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 shadow-md"
            >
              Get Started
            </a>
            <a
              href="#learn-more"
              className="px-6 py-3 text-lg font-medium rounded-lg text-indigo-700 bg-indigo-100 hover:bg-indigo-200 transition-all duration-300"
            >
              Learn More
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>

      </div>

      <main className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-12">
        <section id="search" className="mb-20">
          <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
            Find Your Billboard
          </h2>
          <div className="bg-white shadow-xl rounded-xl p-8">
            <form className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  id: "location",
                  label: "Location",
                  type: "text",
                  placeholder: "City or ZIP code",
                },
                {
                  id: "budget",
                  label: "Budget (per month)",
                  type: "number",
                  placeholder: "Max budget",
                },
              ].map((input, index) => (
                <div key={index}>
                  <label
                    htmlFor={input.id}
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    {input.label}
                  </label>
                  <input
                    type={input.type}
                    id={input.id}
                    placeholder={input.placeholder}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                  />
                </div>
              ))}
              <div>
                <label
                  htmlFor="size"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Billboard Size
                </label>
                <select
                  id="size"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                >
                  <option>Any Size</option>
                  <option>Small (8x16 ft)</option>
                  <option>Medium (14x48 ft)</option>
                  <option>Large (20x60 ft)</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-5 py-2.5 rounded-md font-medium hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 shadow-lg"
                >
                  Search Billboards
                </button>
              </div>
            </form>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <FaSearch className="h-7 w-7" />,
                title: "Search Locations",
                text: "Browse our database of premium billboard locations across the country.",
              },
              {
                icon: <FaMapMarkerAlt className="h-7 w-7" />,
                title: "Choose Your Spot",
                text: "Select the ideal location for your advertising goals.",
              },
              {
                icon: <FaDollarSign className="h-7 w-7" />,
                title: "Rent with Ease",
                text: "Book online and get ready to showcase your advertisement.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-8 text-center transition-transform duration-300 hover:scale-105"
              >
                <div className="flex items-center justify-center h-14 w-14 rounded-full bg-indigo-500 text-white mb-5">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
            Featured Billboards
          </h2>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white shadow-xl rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105"
              >
                <div className="relative h-56">
                  <img
                    src="/image.png"
                    alt={`Featured Billboard ${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Prime Location {i}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    High-traffic area with maximum visibility.
                  </p>
                  <a
                    href={`#billboard-${i}`}
                    className="text-indigo-600 hover:text-indigo-500 font-medium transition-all duration-300"
                  >
                    View Details →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
