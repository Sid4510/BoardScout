import React, { useState, useEffect } from "react";
import OrderCard from "./OrderCard";
import { Link } from "react-router-dom";  
import axios from "axios";

const OrderList = () => {
  const [activeTab, setActiveTab] = useState("Orders");
  const [orders, setOrders] = useState([]); 
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem("UserID"); 
        const response = await axios.get(`http://localhost:5000/order/getOrders/${userId}`);
        if (response.status === 200) {
          setOrders(response.data); 
        } else {
          console.error("Error fetching orders:", response);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);  
      }
    };

    fetchOrders();
  }, []);

  // Filter orders based on the active tab
  const filteredOrders = orders.filter((order) => {
    if (activeTab === "Orders") return order.status === "Delivered";  // Modify or add other conditions if needed
    if (activeTab === "Not Yet Shipped") return order.status === "Not Yet Shipped";
    if (activeTab === "Cancelled Orders") return order.status === "Cancelled";
    if (activeTab === "Pending") return order.status === "Pending";  // New tab for Pending orders
    return [];
  });

  if (loading) {
    return <p>Loading orders...</p>;
  }

  return (
    <div className="w-3/4 mx-auto min-h-screen p-6">
      <div className="text-sm text-gray-500 mb-4">
        <Link to="/youracc">
          <span className="hover:text-theme cursor-pointer">Your Account</span>{" "}
        </Link>
        &gt;{" "}
        <span className="text-gray-800 font-semibold">Your Orders</span>
      </div>

      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

      <div className="flex border-b border-gray-300 mb-4">
        {["Orders", "Not Yet Shipped", "Cancelled Orders", "Pending"].map(   // Added Pending tab
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium ${activeTab === tab
                ? "text-theme border-b-2 border-theme"
                : "text-gray-700 hover:theme"
                }`}
            >
              {tab}
            </button>
          )
        )}
      </div>

      {filteredOrders.length > 0 ? (
        filteredOrders.map((order, index) => (
          <OrderCard key={index} order={order} />
        ))
      ) : (
        <div className="text-center mt-10 text-gray-600">
          <p className="text-lg font-medium">
            0 orders placed in the last 30 days
          </p>
          <p className="mt-2">
            Looks like you have not placed an order in the last 30 days.{" "}
            <a href="#" className="text-blue-500 hover:underline">
              View orders in past 3 months
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderList;
