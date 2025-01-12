import React, { useState } from "react";
import { Link } from "react-router";

const AddPaymentMethods = () => {
    const [paymentType, setPaymentType] = useState("card");

    return (
        <div className="bg-gray-100 min-h-screen p-8 ">
            <div className="mx-auto w-fit" >
                <div className="text-sm text-gray-500 mb-4">
                    <Link to="/youracc">
                        <span className="hover:text-theme cursor-pointer">Your Account</span>{" "}
                    </Link>
                    &gt;{" "}
                    <span className="text-gray-800 font-semibold">Payment Options</span>
                </div>

                <h1 className="text-2xl font-semibold mb-6">Add Payment Method</h1>

                <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl ">
                    <h2 className="text-lg font-medium mb-4">Select Payment Method</h2>

                    <div className="flex gap-6 mb-6">
                        <button
                            className={`px-4 py-2 rounded-md ${paymentType === "card" ? "bg-theme text-white" : "bg-gray-200"
                                }`}
                            onClick={() => setPaymentType("card")}
                        >
                            Credit/Debit Card
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md ${paymentType === "upi" ? "bg-theme text-white" : "bg-gray-200 hover:bg-gray-300"
                                }`}
                            onClick={() => setPaymentType("upi")}
                        >
                            UPI
                        </button>
                    </div>

                    {/* Payment Form */}
                    {paymentType === "card" ? (
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-600 font-medium mb-2" htmlFor="cardName">
                                    Name on Card
                                </label>
                                <input
                                    id="cardName"
                                    type="text"
                                    className="border rounded-md w-full p-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="e.g., John Doe"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-600 font-medium mb-2" htmlFor="cardNumber">
                                    Card Number
                                </label>
                                <input
                                    id="cardNumber"
                                    type="text"
                                    className="border rounded-md w-full p-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="e.g., 1234 5678 9101 1121"
                                />
                            </div>

                            <div className="flex gap-4 mb-4">
                                <div className="w-1/2">
                                    <label className="block text-gray-600 font-medium mb-2" htmlFor="expiryDate">
                                        Expiry Date
                                    </label>
                                    <input
                                        id="expiryDate"
                                        type="text"
                                        className="border rounded-md w-full p-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="MM/YY"
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label className="block text-gray-600 font-medium mb-2" htmlFor="cvv">
                                        CVV
                                    </label>
                                    <input
                                        id="cvv"
                                        type="text"
                                        className="border rounded-md w-full p-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="e.g., 123"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="bg-theme text-white px-4 py-2 rounded-md hover:bg-theme1"
                            >
                                Add Card
                            </button>
                        </form>
                    ) : (
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-600 font-medium mb-2" htmlFor="upiId">
                                    UPI ID
                                </label>
                                <input
                                    id="upiId"
                                    type="text"
                                    className="border rounded-md w-full p-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="e.g., yourname@bank"
                                />
                            </div>

                            <button
                                type="submit"
                                className="bg-theme text-white px-4 py-2 rounded-md hover:bg-theme1"
                            >
                                Add UPI
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddPaymentMethods;
