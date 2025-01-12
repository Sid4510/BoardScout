import React, { useState } from "react";
import axios from "axios";
import { GrGoogle } from "react-icons/gr";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); 
        const payload = {
            email: email,
            password: password,
        };
    
        try {
            const response = await fetch("http://localhost:5000/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Login failed");
            }
            
            const data = await response.json();
            console.log("Login successful:", data);
            localStorage.setItem("UserID",data.user.id);
            setErrorMessage(""); 
            navigate("/"); 
        } catch (error) {
            console.error("Error during login:", error.message);
            setErrorMessage(error.message); 
        }
    };
    
    

    return (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen">
            <div className="text-3xl font-extrabold text-theme ml-5 pt-5 mb-10">
                <a href="/">BuyKaro.</a>
            </div>
            <div className="flex items-center justify-center mt-14">
                <div className="w-full max-w-md p-8 bg-gray-700 shadow-lg rounded-md">
                    <h2 className="text-2xl font-bold text-center text-theme">
                        Login to Your Account
                    </h2>
                    <p className="text-sm text-center text-gray-300 mt-2">
                        Welcome back! Please enter your details.
                    </p>

                    {errorMessage && (
                        <div className="bg-red-100 text-red-700 p-2 rounded mt-4">
                            {errorMessage}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="mt-6">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email or Username
                            </label>
                            <input
                                type="text"
                                id="email"
                                placeholder="Enter your email or username"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mt-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mt-4 text-right">
                            <a href="#" className="text-sm text-gray-300 hover:underline">
                                Forgot your password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-theme text-white py-2 px-4 rounded-md mt-6 hover:bg-blue-700"
                        >
                            Login
                        </button>
                    </form>

                    <p className="text-sm text-center text-gray-300 mt-4">
                        Login using{" "}
                        <div className="flex justify-around w-1/3 mx-auto mt-2">
                            <GrGoogle size={18} className="hover:text-slate-50" />
                            <FaFacebook size={18} className="hover:text-slate-50" />
                            <FaGithub size={18} className="hover:text-slate-50" />
                        </div>
                    </p>

                    <div className="mt-6 border-t border-gray-300"></div>

                    <p className="text-sm text-center text-gray-300 mt-4">
                        Don't have an account?{" "}
                        <a href="/signin" className="text-theme hover:underline">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
