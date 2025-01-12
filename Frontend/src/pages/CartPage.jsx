import React, { useState, useEffect } from "react";
import CartCard from "../components/cart/CartCard";
import axios from "axios";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import { Link } from "react-router";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userId = localStorage.getItem("UserID");
        console.log(userId);
        const response = await axios.get(`http://localhost:5000/cart/getcart?userId=${userId}`, {
          withCredentials: true
        });

        if (response.status === 200) {
          console.log(response.data);
          // Ensure the cart exists and is an array
          setCartItems(response.data.cart || []);
        } else {
          console.error("Error fetching cart items:", response);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleIncrease = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleDelete = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  if (loading) {
    return <p>Loading cart...</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 min-h-screen flex p-5 gap-3">
        <div className="bg-white rounded-lg shadow-md p-6 w-3/4 h-fit">
          <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>

          <div className="h-[2px] w-full bg-gray-300 rounded-xl my-2"></div>

          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CartCard
                key={item._id}
                image={item.productId.images[0]}
                title={item.productId.productName}
                seller={item.productId.companyName}
                price={item.productId.price}
                quantity={item.quantity}
                onIncrease={() => handleIncrease(item._id)}
                onDecrease={() => handleDecrease(item._id)}
                onDelete={() => handleDelete(item._id)}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          )}

          <div className="flex justify-start items-center mt-6">
            <p className="text-lg font-semibold">
              Subtotal (
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)} item
              {cartItems.length > 1 ? "s" : ""}): ₹
              {cartItems
                .reduce((acc, item) => acc + item.quantity * item.productId.price, 0)
                .toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-md shadow-md w-1/4 h-fit">
          <p className="text-lg font-semibold">
            Subtotal (
            {cartItems.reduce((acc, item) => acc + item.quantity, 0)} item
            {cartItems.length > 1 ? "s" : ""}): ₹
            {cartItems
              .reduce((acc, item) => acc + item.quantity * item.productId.price, 0)
              .toLocaleString()}
          </p>
          <button className="w-full bg-theme text-black py-2 rounded-md font-medium text-sm mt-4 hover:bg-theme1">
            <Link to="/checkout">
            Proceed to Buy
          </Link>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
