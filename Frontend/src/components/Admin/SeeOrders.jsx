import React from 'react'
import OrderCard from '../Order/OrderCard'
import { useState  } from 'react';


function SeeOrders() {

    const [activeTab, setActiveTab] = useState("Orders");
    
        
        const orders = [

        ];
    
        const filteredOrders = orders.filter((order) => {
            if (activeTab === "Orders") return order.status === "Delivered";
            if (activeTab === "Not Yet Shipped") return order.status === "Not Yet Shipped";
            if (activeTab === "Cancelled Orders") return order.status === "Cancelled";
            return [];
        });
    

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="text-3xl font-extrabold text-theme">
                <p>BuyKaro.</p>
            </div>
            <h1 className="text-3xl font-bold mb-6">Orders</h1>
            <div>
                <div className="w-3/4  min-h-screen p-6">
                    <div className="flex border-b border-gray-300 mb-4">
                        {["Orders", "Buy Again", "Not Yet Shipped", "Cancelled Orders"].map(
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
            </div>

        </div>
    )
}

export default SeeOrders
