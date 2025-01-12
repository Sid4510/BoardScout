import React from "react";
import { Link } from "react-router";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-300 py-10 px-10">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-32">

                <div>
                    <h3 className="text-theme font-semibold mb-3">Get to Know Us</h3>
                    <ul>
                        <li><a href="#about" className="hover:underline">About BuyKaro</a></li>
                        <li><a href="#careers" className="hover:underline">Careers</a></li>
                        <li><a href="#press" className="hover:underline">Press Releases</a></li>
                    </ul>
                </div>


                <div>
                    <h3 className="text-theme font-semibold mb-3">Connect with Us</h3>
                    <ul>
                        <li><a href="#facebook" className="hover:underline">Facebook</a></li>
                        <li><a href="#twitter" className="hover:underline">Twitter</a></li>
                        <li><a href="#instagram" className="hover:underline">Instagram</a></li>
                    </ul>
                </div>


                <div>
                    <h3 className="text-theme font-semibold mb-3">Make Money with Us</h3>
                    <ul>
                        <li><a href="#sell" className="hover:underline">Sell on BuyKaro</a></li>
                        <li><a href="#brand" className="hover:underline">Protect and Build Your Brand</a></li>
                        <li><a href="#ads" className="hover:underline">Advertise Your Products</a></li>
                    </ul>
                </div>


                <div>
                    <h3 className="text-theme font-semibold mb-3">Let Us Help You</h3>
                    <ul>
                        <li><a href="#account" className="hover:underline">Your Account</a></li>
                        <li><a href="#returns" className="hover:underline">Returns Centre</a></li>
                        <li><a href="#alerts" className="hover:underline">Recalls and Product Safety Alerts</a></li>
                        <li><a href="#protection" className="hover:underline">100% Purchase Protection</a></li>
                    </ul>
                </div>
            </div>


            <div className="border-t border-gray-700 my-6"></div>


            <div className="text-center mt-8">
                <Link to="/" className="text-3xl text-theme font-extrabold">BuyKaro.</Link>
                <p className="text-gray-600 text-sm">&copy; {new Date().getFullYear()}BuyKaro. All rights reserved.</p>
            </div>

        </footer>
    );
};

export default Footer;
