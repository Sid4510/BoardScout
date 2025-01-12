import React from "react";
import { Link } from "react-router";

const AdminPage = () => {
  return (
    <div className="min-h-screen p-8">
      
      <header className="flex justify-between items-center bg-white  p-4 rounded-lg mb-3">
      <div className="text-3xl font-extrabold text-theme">
          <p>BuyKaro.</p>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-700">Admin Dashboard</h1>
        <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
          Logout
        </button>
      </header>
      <div className="h-[2px] w-full bg-gray-300 rounded-xl mb-6"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <Link className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
          <span className="text-blue-500 text-4xl mb-4">➕</span>
          <h2 className="text-lg font-semibold mb-2">Add Product</h2>
          <p className="text-sm text-gray-600 text-center mb-4">
            Add new products to the store for customers to purchase.
          </p>
          <Link to="/addproduct" className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600">
            Go to Add Product
          </Link>
        </Link>

        {/* Manage Products */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
          <span className="text-green-500 text-4xl mb-4">📦</span>
          <h2 className="text-lg font-semibold mb-2">Manage Products</h2>
          <p className="text-sm text-gray-600 text-center mb-4">
            Edit or delete existing products in the store.
          </p>
          <Link to="/addproduct" className="px-4 py-2 bg-green-500 text-white text-sm rounded-md hover:bg-green-600">
            Manage Products
          </Link>
        </div>

        {/* View Orders */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
          <span className="text-orange-500 text-4xl mb-4">📄</span>
          <h2 className="text-lg font-semibold mb-2">View Orders</h2>
          <p className="text-sm text-gray-600 text-center mb-4">
            Check customer orders and update their statuses.
          </p>
          <Link to="/seeorders" className="px-4 py-2 bg-orange-500 text-white text-sm rounded-md hover:bg-orange-600">
            View Orders
          </Link>
        </div>

        {/* Manage Users */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
          <span className="text-purple-500 text-4xl mb-4">👤</span>
          <h2 className="text-lg font-semibold mb-2">Manage Users</h2>
          <p className="text-sm text-gray-600 text-center mb-4">
            View or block users and manage their roles.
          </p>
          <button className="px-4 py-2 bg-purple-500 text-white text-sm rounded-md hover:bg-purple-600">
            Manage Users
          </button>
        </div>

        {/* Analytics */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
          <span className="text-indigo-500 text-4xl mb-4">📊</span>
          <h2 className="text-lg font-semibold mb-2">View Analytics</h2>
          <p className="text-sm text-gray-600 text-center mb-4">
            Analyze store performance and user behavior.
          </p>
          <button className="px-4 py-2 bg-indigo-500 text-white text-sm rounded-md hover:bg-indigo-600">
            View Analytics
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
