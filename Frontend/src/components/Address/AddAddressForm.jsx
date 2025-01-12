import React, { useState } from "react";
import axios from "axios";

const AddAddressForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    country: "India",
    postalcode: "",
    address: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
    isDefault: false,
  });

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("UserID");

    if (!userId) {
      alert("User ID not found in localStorage.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/users/${userId}/addresses`,
        {
          area: formData.address,
          landmark:formData.landmark,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalcode,
          country: formData.country,
          isDefault: formData.isDefault,
        }
      );

      if (response.status === 201) {
        alert("Address added successfully!");
        onClose();
      }
    } catch (error) {
      console.error("Error adding address:", error);
      alert("Failed to add address. Please try again.");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-xl text-theme font-semibold mb-6">Add a new address</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2" htmlFor="country">
            Country/Region
          </label>
          <select
            id="country"
            value={formData.country}
            onChange={handleInputChange}
            className="border rounded-md w-full p-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option>India</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2" htmlFor="postalcode">
            Postalcode
          </label>
          <input
            id="postalcode"
            type="text"
            value={formData.postalcode}
            onChange={handleInputChange}
            className="border rounded-md w-full p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2" htmlFor="address">
            Flat, House no., Building, Company, Apartment
          </label>
          <input
            id="address"
            type="text"
            value={formData.address}
            onChange={handleInputChange}
            className="border rounded-md w-full p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2" htmlFor="area">
            Area, Street, Sector, Village
          </label>
          <input
            id="area"
            type="text"
            value={formData.area}
            onChange={handleInputChange}
            className="border rounded-md w-full p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2" htmlFor="landmark">
            Landmark
          </label>
          <input
            id="landmark"
            type="text"
            value={formData.landmark}
            onChange={handleInputChange}
            className="border rounded-md w-full p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label className="block text-gray-600 font-medium mb-2" htmlFor="city">
              Town/City
            </label>
            <input
              id="city"
              type="text"
              value={formData.city}
              onChange={handleInputChange}
              className="border rounded-md w-full p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="w-1/2">
            <label className="block text-gray-600 font-medium mb-2" htmlFor="state">
              State
            </label>
            <select
              id="state"
              value={formData.state}
              onChange={handleInputChange}
              className="border rounded-md w-full p-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option>Choose a state</option>
              <option>Maharashtra</option>
              <option>New Delhi</option>
              <option>Tamil Nadu</option>
              <option>Kerala</option>
              <option>karnataka</option>
              <option>Madhya Pradesh</option>
              <option>Andra Pradesh</option>
              <option>Uttar Pradesh</option>
              
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="flex items-center">
            <input
              id="isDefault"
              type="checkbox"
              checked={formData.isDefault}
              onChange={handleInputChange}
              className="mr-2"
            />
            Make this my default address
          </label>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-theme text-white px-4 py-2 rounded-md hover:bg-theme1"
          >
            Add address
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAddressForm;
