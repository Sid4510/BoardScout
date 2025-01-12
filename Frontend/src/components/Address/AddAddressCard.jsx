import React from "react";

const AddAddressCard = () => {
  return (
    <div className="border-dashed border-2 border-gray-300 rounded-md p-8 w-80 flex items-center justify-center cursor-pointer h-full">
      <div className="text-center text-gray-500">
        <p className="text-4xl font-light hover:text-theme">+</p>
        <p className="font-medium">Add address</p>
      </div>
    </div>
  );
};

export default AddAddressCard;
