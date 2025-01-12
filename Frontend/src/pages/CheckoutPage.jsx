import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import CheckoutCard from "../components/Order/CheckoutCard";


const CheckoutPage = () => {
    const [cart, setCart] = useState(null);
    const [user, setUser] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem("UserID");
        if (userId) {
            axios
                .get(`http://localhost:5000/users/${userId}`)
                .then((response) => {
                    setUser(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching user data", error);
                });


            axios
                .get(`http://localhost:5000/cart/getcart?userId=${userId}`)
                .then((response) => {
                    setCart(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching cart data", error);
                });
        }
    }, []);
    if (!cart || !user) {
        return <div>Loading...</div>;
    }

    const defaultAddress = user.defaultAddress;

    if (!defaultAddress) {
        return <div>No default address found. Please add one.</div>;
    }

    const cartItems = cart.cart || [];

    console.log(defaultAddress);
    const totalItemsPrice = cartItems.reduce((acc, item) => {
        return acc + (item.productId.price * item.quantity);
    }, 0);

    const deliveryFee = 40;
    const codFee = 7;
    const promoDiscount = 40;
    
    const ClearCart = () => {
        const userId = localStorage.getItem("UserID");
        axios.delete(`http://localhost:5000/cart/clear/${userId}`)
            .then((clearResponse) => {
                console.log('Cart cleared:', clearResponse.data);
                navigate("/order");
            })
            .catch((error) => {
                console.error('Error clearing the cart:', error);
            });
    }
    const orderTotal = totalItemsPrice + deliveryFee + codFee - promoDiscount;

    const handleOrder = () => {
        const userId = localStorage.getItem("UserID");

        console.log(userId)

        const orders = cartItems.map((item) => {
            const orderTotal = (item.productId.price * item.quantity);

            return {
                user: userId,
                items: [{
                    name:item.productId.productName,
                    product: item.productId,
                    quantity: item.quantity,
                    price: item.productId.price,
                }],
                totalAmount: orderTotal,
                paymentMethod,
                deliveryAddress: defaultAddress,
                status: "Pending",
                orderDate: new Date(),
            };
        });

        orders.forEach((order) => {
            axios.post('http://localhost:5000/order/create', order)
                .then((response) => {
                    console.log('Order created:', response.data);
                    ClearCart();
                })
                .catch((error) => {
                    console.error('Error creating order:', error);
                });
        });

    };


    return (
        <div className="bg-gray-50">
            <div className="text-3xl font-extrabold text-theme mt-5 ml-5">
                <p>BuyKaro.</p>
            </div>

            <div className="mx-auto grid grid-cols-1 md:grid-cols-5 px-10">
                <div className="max-w-4xl py-8 pl-16 pr-6 min-h-screen md:col-span-3">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="border-b pb-4 mb-4 flex justify-between">
                            <div>
                                <h2 className="font-bold text-lg mb-2 text-gray-800">
                                    Delivering to {user.name}
                                </h2>
                                <p className="text-gray-600 text-sm w-60">
                                    {defaultAddress.area}, {defaultAddress.landmark}, {defaultAddress.city}, {defaultAddress.state}, {defaultAddress.postalcode}, {defaultAddress.country}
                                </p>
                            </div>
                            <Link to="/youraddress" className="text-gray-700 text-sm hover:underline mt-2">Change</Link>
                        </div>

                        <div className="border-b pb-4 mb-4">
                            <h2 className="font-bold text-lg mb-2 text-gray-800">Payment Options</h2>
                            <form>
                                <div className="flex items-center mb-2">
                                    <input
                                        type="radio"
                                        id="cod"
                                        name="paymentMethod"
                                        value="COD"
                                        className="w-4 h-4 text-blue-500 focus:ring-blue-400"
                                        checked={paymentMethod === "COD"}
                                        onChange={() => setPaymentMethod("COD")}
                                    />
                                    <label htmlFor="cod" className="ml-2 text-sm text-gray-800">Cash on Delivery (COD)</label>
                                </div>

                                <div className="flex items-center mb-2">
                                    <input
                                        type="radio"
                                        id="upi"
                                        name="paymentMethod"
                                        value="UPI"
                                        className="w-4 h-4 text-blue-500 focus:ring-blue-400"
                                        checked={paymentMethod === "UPI"}
                                        onChange={() => setPaymentMethod("UPI")}
                                    />
                                    <label htmlFor="upi" className="ml-2 text-sm text-gray-800">UPI</label>
                                </div>

                                <div className="flex items-center mb-2">
                                    <input
                                        type="radio"
                                        id="creditCard"
                                        name="paymentMethod"
                                        value="CreditCard"
                                        className="w-4 h-4 text-blue-500 focus:ring-blue-400"
                                        checked={paymentMethod === "CreditCard"}
                                        onChange={() => setPaymentMethod("CreditCard")}
                                    />
                                    <label htmlFor="creditCard" className="ml-2 text-sm text-gray-800">Credit Card</label>
                                </div>
                            </form>
                        </div>

                        <div className="border-b pb-4 mb-4">
                            <h2 className="font-bold text-lg mb-2 text-gray-800">Order Summary</h2>
                            <ul className="text-sm text-gray-600">
                                <li className="flex justify-between">
                                    <span>Items:</span> <span>₹{totalItemsPrice.toFixed(2)}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Delivery:</span> <span>₹{deliveryFee}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Cash/Pay on Delivery Fee:</span> <span>₹{codFee}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Promotion Applied:</span> <span>-₹{promoDiscount}</span>
                                </li>
                            </ul>
                            <h3 className="font-bold text-lg mt-4 flex justify-between text-gray-800">
                                <span>Order Total:</span> <span>₹{orderTotal.toFixed(2)}</span>
                            </h3>
                        </div>

                        <div>
                            <h2 className="font-bold text-lg mb-2 text-gray-800">Arriving on</h2>
                            {cart.cart.length > 0 ? (
                                cart.cart.map((item) => (
                                    <CheckoutCard
                                        key={item._id}
                                        image={item.productId.images[0]}
                                        title={item.productId.productName}
                                        seller={item.productId.companyName}
                                        price={item.productId.price}
                                        quantity={item.quantity}
                                    />
                                ))
                            ) : (
                                <p className="text-center text-gray-500">Your cart is empty.</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="pr-10 md:col-span-2">
                    <div className="mt-6">
                        <div className="bg-white rounded-lg shadow-lg p-4">
                            <h2 className="font-bold text-lg mb-2 text-gray-800">Order Summary</h2>
                            <ul className="text-sm text-gray-600">
                                <li className="flex justify-between">
                                    <span>Items:</span> <span>₹{totalItemsPrice.toFixed(2)}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Delivery:</span> <span>₹{deliveryFee}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Cash/Pay on Delivery Fee:</span> <span>₹{codFee}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Promotion Applied:</span> <span>-₹{promoDiscount}</span>
                                </li>
                            </ul>
                            <h3 className="font-bold text-lg mt-4 flex justify-between text-gray-800">
                                <span>Order Total:</span> <span>₹{orderTotal.toFixed(2)}</span>
                            </h3>
                            <div className="flex justify-center mt-5">
                                <button
                                    onClick={handleOrder}
                                    className="px-20 py-1 text-lg font-semibold rounded-md bg-theme text-white hover:bg-theme1"
                                >
                                    Order
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
