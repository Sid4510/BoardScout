import React from "react";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-gradient-to-r from-green-100 to-blue-100 min-h-screen">
        {/* Hero Section */}
        <section className="flex items-center justify-between px-10 py-5 bg-green-100">
          <div>
            <h2 className="text-xl font-semibold">Deals on makeup</h2>
            <h1 className="text-3xl font-bold text-gray-800">Starting ₹199</h1>
            <p className="mt-2">LAKMÉ | SWISS BEAUTY &amp; more</p>
            <button className="mt-4 bg-black text-white px-4 py-1 rounded">
              Unlimited 5% Cashback
            </button>
          </div>
          <div>
            <img
              src="https://via.placeholder.com/100"
              alt="Makeup Items"
              className="h-32 w-32"
            />
          </div>
        </section>

        {/* Product Grid */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
          {/* Card 1: Footwear & Handbags */}
          <div className="bg-white shadow-md p-4 rounded">
            <h3 className="text-lg font-semibold mb-2">
              Up to 60% off | Footwear & handbags
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <img
                src="https://via.placeholder.com/150"
                alt="Sports Shoes"
                className="rounded"
              />
              <img
                src="https://via.placeholder.com/150"
                alt="Men's Shoes"
                className="rounded"
              />
            </div>
            <p className="text-blue-600 mt-2">See all offers</p>
          </div>

          {/* Card 2: Home Styling */}
          <div className="bg-white shadow-md p-4 rounded">
            <h3 className="text-lg font-semibold mb-2">
              Revamp your home in style
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <img
                src="https://via.placeholder.com/150"
                alt="Cushion Covers"
                className="rounded"
              />
              <img
                src="https://via.placeholder.com/150"
                alt="Vases"
                className="rounded"
              />
            </div>
            <p className="text-blue-600 mt-2">Explore all</p>
          </div>

          {/* Card 3: Headphones */}
          <div className="bg-white shadow-md p-4 rounded">
            <h3 className="text-lg font-semibold mb-2">Up to 75% off | Headphones</h3>
            <img
              src="https://via.placeholder.com/150"
              alt="Headphones"
              className="w-full rounded"
            />
            <p className="text-blue-600 mt-2">Shop Now</p>
          </div>

          {/* Card 4: Cashback */}
          <div className="bg-white shadow-md p-4 rounded">
            <h3 className="text-lg font-semibold mb-2">
              Up to ₹500 cashback on first purchase*
            </h3>
            <img
              src="https://via.placeholder.com/150"
              alt="Amazon Business"
              className="w-full rounded"
            />
            <p className="text-blue-600 mt-2">Register now</p>
          </div>
        </section>

        {/* Sponsored Section */}
        <section className="bg-white shadow-md p-4 rounded mx-6">
          <div className="flex items-center justify-between">
            <div>
              <img
                src="https://via.placeholder.com/100"
                alt="Red Bull"
                className="w-24"
              />
              <p className="font-semibold text-red-600 mt-2">
                Red Bull Energy Drink
              </p>
              <p className="text-gray-500 text-sm">Unleash Unstoppable Energy</p>
            </div>
            <div>
              <p className="text-lg font-bold text-red-600">₹2,640.00</p>
              <p className="line-through text-gray-400">M.R.P.: ₹3,000.00</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
