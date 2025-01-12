import React from "react";
import axios from "axios";

const AddressCard = ({ setAddresses,addressId,landmark, address, city, state, postalcode, isDefault }) => {

  const handleRemove = async () => {
    const userId = localStorage.getItem("UserID");

    if (!userId) {
      alert("User not found.");
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/users/${userId}/addresses/${addressId}`);
      
      setAddresses(addresses.filter((address) => address._id !== addressId));
    } catch (error) {
      console.error("Failed to remove address", error);
    }
  };
  const handleSetDefault = async () => {
    const userId = localStorage.getItem("UserID");

    if (!userId) {
      alert("User not found.");
      return;
    }

    try {
      await axios.put(`http://localhost:3000/users/${userId}/addresses/${addressId}`, { isDefault: true });

    } catch (error) {
      console.error("Failed to set as default", error);
    }
  };

  return (
    <div className="border rounded-md p-4 w-80 shadow-md bg-white">
      
      {isDefault && (
        <div className="mb-2 text-sm font-medium text-gray-500">
          <span className="bg-theme1 text-white px-2 py-1 rounded-md">
            Default
          </span>
        </div>
      )}

      
      <p className="text-sm text-gray-600">{address}</p>
      <p className="text-sm text-gray-600">{landmark}</p>
      <p className="text-sm text-gray-600">{city}, {state}</p>
      <p className="text-sm text-gray-600">{ postalcode}</p>

      
      <div className="mt-4 flex gap-4 text-sm">
        <a href="#" onClick={handleRemove} className="text-blue-500 hover:underline">Remove</a>
        {!isDefault && (
          <a href="#" onClick={handleSetDefault} className="text-blue-500 hover:underline">Set as Default</a>
        )}
      </div>
    </div>
  );
};

export default AddressCard;
