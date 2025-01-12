import React, { useState, useEffect } from "react";
import AddAddressForm from "./AddAddressForm";
import AddAddressCard from "./AddAddressCard";
import AddressCard from "./AddressCard";
import { Link } from "react-router";
import axios from "axios";

const AddressList = () => {
    const [showForm, setShowForm] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAddresses = async () => {
            const userId = localStorage.getItem("UserID");

            if (!userId) {
                setError("User ID not found in localStorage.");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:3000/users/${userId}/addresses`);  // Ensure this is correct
                setAddresses(response.data.addresses || []);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch addresses. Please try again.");
                setLoading(false);
            }
        };


        fetchAddresses();
    }, []);

    if (loading) {
        return <p>Loading addresses...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="mb-20 bg-white p-8 mx-auto w-fit">
            <div className="text-sm text-gray-500 mb-4">
                <Link to="/youracc">
                    <span className="hover:text-theme cursor-pointer">Your Account</span>{" "}
                </Link>
                &gt; <span className="text-gray-800 font-semibold">Your Addresses</span>
            </div>
            <h1 className="text-2xl font-semibold">Addresses</h1>
            <div className="h-[2px] w-full bg-gray-300 rounded-xl mt-2 mb-7"></div>
            {showForm ? (
                <AddAddressForm onClose={() => setShowForm(false)} />
            ) : (
                <div className="flex gap-6 flex-wrap">
                    <div onClick={() => setShowForm(true)}>
                        <AddAddressCard />
                    </div>
                    {addresses.length > 0 ? (
                        addresses.map((address) => (
                            <AddressCard
                                key={address._id}
                                addressId={address._id}
                                address={address.area}
                                landmark={address.landmark}
                                postalCode={address.postalCode}
                                city={address.city}
                                setAddresses={setAddresses}
                                state={`${address.state} ${address.postalCode}`}
                                isDefault={address.isDefault}
                            />
                        ))
                    ) : (
                        <p className="text-gray-500">No addresses found. Add a new one!</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default AddressList;
